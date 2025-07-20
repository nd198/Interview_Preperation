// src/bad_isp_example/adminManager.js (Violates ISP)

class AdminManager {
    constructor() {
        this.users = [];
        this.products = [];
        console.log("AdminManager: Initialized with ALL admin capabilities.");
    }

    // User management methods
    createUser(user) {
        this.users.push(user);
        console.log(`AdminManager: User '${user.name}' created.`);
    }

    deleteUser(userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter(u => u.id !== userId);
        if (this.users.length < initialLength) {
            console.log(`AdminManager: User ID '${userId}' deleted.`);
        } else {
            console.log(`AdminManager: User ID '${userId}' not found.`);
        }
    }

    // Product management methods
    createProduct(product) {
        this.products.push(product);
        console.log(`AdminManager: Product '${product.name}' created.`);
    }

    deleteProduct(productId) {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== productId);
        if (this.products.length < initialLength) {
            console.log(`AdminManager: Product ID '${productId}' deleted.`);
        } else {
            console.log(`AdminManager: Product ID '${productId}' not found.`);
        }
    }

    // Potentially other unrelated methods like:
    // generateReports() { ... }
    // manageServerSettings() { ... }
}

module.exports = AdminManager;