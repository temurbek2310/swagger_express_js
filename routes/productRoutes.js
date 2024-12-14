const express = require("express");
const router = express.Router();
const { 
    addProduct, 
    getAllProducts, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { authenticateToken } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Yangi mahsulot qo'shish
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Telefon"
 *               price:
 *                 type: number
 *                 example: 500
 *               description:
 *                 type: string
 *                 example: "Yangi smartfon modeli"
 *     responses:
 *       201:
 *         description: Mahsulot muvaffaqiyatli qo'shildi
 *       401:
 *         description: Token noto‘g‘ri yoki yo‘q
 *       403:
 *         description: Token yaroqsiz
 */
router.post('/', authenticateToken, addProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Mahsulotlar muvaffaqiyatli olindi
 *       401:
 *         description: Token noto‘g‘ri yoki yo‘q
 *       403:
 *         description: Token yaroqsiz
 */
router.get('/', authenticateToken, getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: ID bo'yicha mahsulotni yangilash
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yangilash uchun mahsulot ID-si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 1000
 *               description:
 *                 type: string
 *                 example: "Yangi model laptop"
 *     responses:
 *       200:
 *         description: Mahsulot muvaffaqiyatli yangilandi
 *       404:
 *         description: Mahsulot topilmadi
 */
router.put('/:id', authenticateToken, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: ID bo'yicha mahsulotni o'chirish
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'chiriladigan mahsulot ID-si
 *     responses:
 *       204:
 *         description: Mahsulot muvaffaqiyatli o'chirildi
 *       404:
 *         description: Mahsulot topilmadi
 */
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;
