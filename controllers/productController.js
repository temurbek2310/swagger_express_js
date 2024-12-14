const Product = require("../models/product");

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const product = await Product.create({ name, price, description });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving products', error: err.message })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: `Product with ${id} not found` });

        product.name = name;
        product.price = price;
        product.description = description;

        await product.save();

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: `Product with ${id} not found` });

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message })
    }
}