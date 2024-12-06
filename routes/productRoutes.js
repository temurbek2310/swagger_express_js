const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const { authenticateToken } = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
// Get all products
router.get('/', authenticateToken, (req, res) => {
    res.status(200).json(productModel.products.length ? productModel.products : { message: 'Products is empty' });
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
// Get product by ID
router.get('/:id', authenticateToken, (req, res) => {
    const product = productModel.getProductById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
// Create a new product
router.post('/', authenticateToken, (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = productModel.addProduct({
        id: Date.now(), // Unique ID
        name,
        price
    });

    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
// Update product
router.put('/:id', authenticateToken, (req, res) => {
    const updatedProduct = productModel.updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).send('Product not found');
    res.json(updatedProduct);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
// Delete product
router.delete('/:id', authenticateToken, (req, res) => {
    const isDeleted = productModel.deleteProduct(req.params.id);
    if (!isDeleted) return res.status(404).json({ message: `Product with id ${req.params.id} not found` });
    res.status(204).send();
});

module.exports = router;
