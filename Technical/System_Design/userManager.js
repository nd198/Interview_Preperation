// src/good_isp_example/userManager.js (Adheres to ISP)

class UserManager {
    constructor() {
        this.users = []; // In a real app, this would interact with a UserRepository
        console.log("UserManager: Initialized (only user management).");
    }

    createUser(user) {
        this.users.push(user);
        console.log(`UserManager: User '${user.name}' created.`);
    }

    deleteUser(userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter(u => u.id !== userId);
        if (this.users.length < initialLength) {
            console.log(`UserManager: User ID '${userId}' deleted.`);
        } else {
            console.log(`UserManager: User ID '${userId}' not found.`);
        }
    }
}

module.exports = UserManager;