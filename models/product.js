const products = [];

module.exports = {
    getAllProducts: () => products,
    getProductById: (id) => products.find(p => p.id === id),
    addProduct: (product) => {
        products.push(product);
        return product;
    },
    updateProduct: (id, updatedProduct) => {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedProduct };
        return products[index];
    },
    deleteProduct: (id) => {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return false;
        products.splice(index, 1);
        return true;
    },
};
