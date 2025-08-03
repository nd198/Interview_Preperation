
// Import the Express library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());


// ====================================================================
// ||                         THE POST API ROUTE                       ||
// ====================================================================
app.post('/api/users/:userId/items', (req, res, next) => { // Added 'next' here!
    
    try {
        console.log('Received a POST request!');

        const { userId } = req.params;
        const requestBody = req.body;

        // --- ERROR HANDLING EXAMPLE: Input Validation ---
        // Check if the required 'itemName' field is missing from the body.
        if (!requestBody.itemName) {
            // Create a new Error object.
            const validationError = new Error("Validation Failed: 'itemName' is a required field.");
            // Set a custom status code property on the error.
            validationError.statusCode = 400; // 400 means "Bad Request"
            
            // Pass the error to Express's error-handling middleware.
            return next(validationError); 
        }

        // --- Business Logic would go here if validation passes ---
        console.log(`Validation passed. Adding item '${requestBody.itemName}' for user ${userId}.`);
        // e.g., db.saveItem(userId, requestBody);


        // --- Sending a Success Response ---
        res.status(201).json({
            message: "Item created successfully!",
            dataReceived: {
                forUser: userId,
                itemDetails: requestBody
            }
        });

    } catch (err) {
        // This catch block will handle any other unexpected synchronous errors.
        // We pass the error to our central handler.
        next(err);
    }
});


// ====================================================================
// ||                 CENTRAL ERROR-HANDLING MIDDLEWARE              ||
// ====================================================================
// This middleware MUST be defined LAST, after all other app.use() and routes.
// Express recognizes it as an error handler because it has 4 arguments.
app.use((err, req, res, next) => {
    
    console.error('--- An error occurred! ---');
    console.error(err.stack); // Log the full error stack trace for debugging.

    // Use the status code from the error if it exists, otherwise default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Send a user-friendly JSON error response
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'An internal server error occurred.'
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Key Changes Explained

// Route Handler Signature: The route handler now includes next as its third argument: (req, res, next). We need this to pass errors forward.

// Validation Logic: The if (!requestBody.itemName) block checks for a required field. If it's missing, it creates a custom Error object, attaches a 400 status code, and calls next(validationError).

// try...catch Block: Wrapping the logic in a try...catch is good practice to catch any unexpected synchronous errors and pass them to your central error handler via next(err).

// Error-Handling Middleware: The app.use((err, req, res, next) => { ... }); function at the end is the central error handler.

// It logs the error stack trace to the console for your debugging purposes. Never send the stack trace to the client in production!

// It sends a clean, structured JSON error message to the client with an appropriate HTTP status code.

// Step 2: Test the Error Scenario

// Now, let's test our new validation. Stop your server (Ctrl + C) and restart it (node server.js).

// In a new terminal, run this curl command, which intentionally omits the itemName from the request body:

// Generated bash
// curl -X POST \
//   -H "Content-Type: application/json" \
//   -d '{
//     "quantity": 2
//   }' \
//   "http://localhost:3000/api/users/456/items"
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// Bash
// IGNORE_WHEN_COPYING_END
// Expected Output

// 1. In the terminal where your server is running, you will see the detailed error log:

// Generated code
// Received a POST request!
// --- An error occurred! ---
// Error: Validation Failed: 'itemName' is a required field.
//     at /path/to/your/project/node-post-api/server.js:28:35
//     at Layer.handle [as handle_request] (...
//     ... (rest of the stack trace)
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// IGNORE_WHEN_COPYING_END

// 2. In the terminal where you ran curl, you will get back the clean, user-friendly error response:

// Generated json
// {
//   "status": "error",
//   "statusCode": 400,
//   "message": "Validation Failed: 'itemName' is a required field."
// }
// IGNORE_WHEN_COPYING_START
// content_copy
// download
// Use code with caution.
// Json
// IGNORE_WHEN_COPYING_END

// This demonstrates the complete lifecycle of error handling in Express: creating an error in a route, passing it with next(), and catching it with a central error-handling middleware to send a proper response.