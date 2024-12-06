const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger-config');
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL encoded body uchun

// CORS konfiguratsiyasi
const corsOptions = {
    origin: "http://localhost:8080", // Bu yerga front-end yoki Swagger URL kiritiladi
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Qo'shimcha header'larni qo'shing
};
app.use(cors(corsOptions));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/products", productRoutes); // Product routes
app.use("/auth", authRoutes);        // Auth routes

// Serverni tinglash
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📖 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
