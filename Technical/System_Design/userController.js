// userController.js - A BAD EXAMPLE VIOLATING SRP

const bcrypt = require('bcrypt'); // For password hashing (mocked)
const jwt = require('jsonwebtoken'); // For JWT token generation (mocked)

// --- Mock Database (should be in a separate repository/data access layer) ---
const mockUsersDb = [];
let nextUserId = 1;
// --- End Mock Database ---

// --- Mock Email Sending (should be in a separate email service) ---
async function sendWelcomeEmail(toEmail, userName) {
    console.log(`[BAD_EXAMPLE] Sending welcome email to ${toEmail} for ${userName}`);
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async
    console.log(`[BAD_EXAMPLE] Welcome email sent to ${toEmail}`);
}
// --- End Mock Email Sending ---

// --- Constants (should be in a config file or environment variables) ---
const SALT_ROUNDS = 10;
const JWT_SECRET = 'super_secret_bad_example_key';
// --- End Constants ---

class UserController {
    /**
     * Handles user registration request.
     * This method is responsible for:
     * 1. Validating input
     * 2. Checking if user exists in DB
     * 3. Hashing password
     * 4. Saving user to DB
     * 5. Sending welcome email
     * 6. Sending HTTP response
     * This clearly violates SRP!
     */
    static async register(req, res) {
        console.log('[BAD_EXAMPLE] Handling register request (all-in-one)...');
        const { email, password, name } = req.body;

        // 1. Input Validation (should be in a separate validation middleware/service)
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password, and name are required.' });
        }
        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        try {
            // 2. Check if user exists in DB (should be in a UserRepository)
            const existingUser = mockUsersDb.find(user => user.email === email);
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists.' });
            }

            // 3. Hashing password (should be in an AuthService)
            // In a real app: const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const hashedPassword = `hashed_${password}_${SALT_ROUNDS}`; // Mock implementation

            // 4. Saving user to DB (should be in a UserRepository)
            const newUser = { id: String(nextUserId++), email, password: hashedPassword, name };
            mockUsersDb.push(newUser);

            // 5. Sending welcome email (should be in an EmailService)
            await sendWelcomeEmail(newUser.email, newUser.name);

            // 6. Sending HTTP response
            console.log(`[BAD_EXAMPLE] User registered: ${newUser.email}`);
            res.status(201).json({ message: 'User registered successfully!', user: { id: newUser.id, email: newUser.email, name: newUser.name } });

        } catch (error) {
            console.error('[BAD_EXAMPLE] Registration error:', error.message);
            res.status(500).json({ message: 'Internal server error during registration.' });
        }
    }

    /**
     * Handles user login request.
     * This method is responsible for:
     * 1. Validating input
     * 2. Finding user in DB
     * 3. Comparing passwords
     * 4. Generating JWT token
     * 5. Sending HTTP response
     * This also clearly violates SRP!
     */
    static async login(req, res) {
        console.log('[BAD_EXAMPLE] Handling login request (all-in-one)...');
        const { email, password } = req.body;

        // 1. Input Validation (should be in a separate validation middleware/service)
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            // 2. Finding user in DB (should be in a UserRepository)
            const user = mockUsersDb.find(u => u.email === email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // 3. Comparing passwords (should be in an AuthService)
            // In a real app: const isPasswordValid = await bcrypt.compare(password, user.password);
            const isPasswordValid = `hashed_${password}_${SALT_ROUNDS}` === user.password; // Mock implementation
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // 4. Generating JWT token (should be in an AuthService)
            // In a real app: const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            const token = `mock_jwt_token_for_${user.email}`; // Mock implementation

            // 5. Sending HTTP response
            console.log(`[BAD_EXAMPLE] User logged in: ${user.email}`);
            res.status(200).json({ message: 'Logged in successfully!', token });

        } catch (error) {
            console.error('[BAD_EXAMPLE] Login error:', error.message);
            res.status(500).json({ message: 'Internal server error during login.' });
        }
    }
}

module.exports = UserController;