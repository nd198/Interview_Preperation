// src/bad_isp_example/userClient.js (Client depending on "fat" interface)

const AdminManager = require('./adminManager');

class UserClient {
    constructor() {
        this.adminManager = new AdminManager(); // This client *must* depend on the full AdminManager
        console.log("UserClient: Initialized and connected to AdminManager (which has product methods too).");
    }

    registerNewUser(userData) {
        console.log("\nUserClient: Registering a new user...");
        this.adminManager.createUser(userData); // Only uses a user method
    }

    removeOldUser(userId) {
        console.log("UserClient: Removing an old user...");
        this.adminManager.deleteUser(userId); // Only uses a user method
    }

    // This client doesn't need product methods, but it's forced to depend on them
    // because AdminManager exposes them.
    // console.log(this.adminManager.createProduct); // This method exists, but we don't need it!
}

module.exports = UserClient;