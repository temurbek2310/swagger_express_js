const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger-config');
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./database/database');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Ma'lumotlar bazasini sinxronlashtirish
sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// CORS konfiguratsiyasi
const corsOptions = {
    origin: ["http://localhost:8080", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use('/users', userRoutes);

// Serverni tinglash
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
