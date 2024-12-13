const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger-config');
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL encoded body uchun

// CORS konfiguratsiyasi
const corsOptions = {
    origin: ["http://localhost:8080", "http://localhost:3000"], // Swagger UI va server domenini qo'shing
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/products", productRoutes); // Product routes
app.use("/auth", authRoutes);        // Auth routes
app.use('/users', userRoutes); // CRUD operatsiyalar uchun

// Serverni tinglash
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
