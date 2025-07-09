// src/good_isp_example/productManager.js (Adheres to ISP)

class ProductManager {
    constructor() {
        this.products = []; // In a real app, this would interact with a ProductRepository
        console.log("ProductManager: Initialized (only product management).");
    }

    createProduct(product) {
        this.products.push(product);
        console.log(`ProductManager: Product '${product.name}' created.`);
    }

    deleteProduct(productId) {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== productId);
        if (this.products.length < initialLength) {
            console.log(`ProductManager: Product ID '${productId}' deleted.`);
        } else {
            console.log(`ProductManager: Product ID '${productId}' not found.`);
        }
    }
}

module.exports = ProductManager;