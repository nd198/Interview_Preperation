**What is a REST API**

**Describe the concept of Idempotency in the context of REST APIs**
In the context of REST APIs, idempotency means that making multiple identical requests will have the same effect on the server's state as making a single request.It's a guarantee that you can safely retry a request without accidentally creating duplicate resources or performing an action multiple times.
**Idempotent HTTP Methods**
The HTTP specification defines which methods should be idempotent. As an API developer, it's your responsibility to implement them according to these definitions.
**The primary idempotent methods are:**
    **GET, HEAD, OPTIONS, TRACE:** These are considered "safe" methods because they are read-only and don't alter the state of the resource on the server. By definition, anything that is safe is also idempotent.
    **PUT:** This method is used to update or replace a resource at a specific URI. If you send the same PUT request multiple times, the first request will update the resource, and subsequent requests will simply overwrite it with the same data, resulting in no change to the resource's final state.[1][7] For instance, PUT /users/123 with the body {"name": "Alice"} will have the same result no matter how many times you send it; user 123's name will be "Alice".
    **DELETE:** As explained earlier, deleting a resource multiple times has the same outcome as deleting it once – the resource is gone.
**Non-Idempotent Methods**
The most common non-idempotent methods are:
    **POST:** Typically used to create a new resource. If you send the same POST request to /users with the body {"name": "Bob"}, you would expect to create a new user named "Bob" each time. Sending it twice would result in two users named Bob with different IDs.[1]
    **PATCH:** Used for partial updates. While a PATCH could be implemented idempotently (e.g., PATCH /users/123 with {"op": "replace", "path": "/status", "value": "active"}), it is not guaranteed to be. For example, if you had a PATCH request to append an item to a list, it would not be idempotent. 

**Why Idempotency is Crucial: A Real-World Scenario**   
    Imagine a user is making a payment in an e-commerce application. The client sends a request to the server to process the payment. Due to a network hiccup, the client doesn't receive a response in a timely manner. It's unclear to the client if the payment was processed or not.
    **If the request was a non-idempotent POST:** A simple retry mechanism on the client-side would send the same POST request again. If the first request actually succeeded, the server would process the payment a second time, leading to the customer being double-charged. This is a significant and costly error.[8]
    **If the request was designed to be idempotent:** Even if it's a POST request, it can be made idempotent by using a unique idempotency key. The client generates a unique ID for the transaction and sends it in the request header (e.g., Idempotency-Key: some-unique-uuid).
    When the server receives the request, it first checks if it has already processed a request with this key.
    If it's the first time seeing the key, it processes the payment and stores the result associated with that key.
    If the client retries the request with the same key, the server recognizes the key, skips processing the payment again, and simply returns the stored result from the initial successful request.
    This ensures that even with network failures and retries, the customer is only charged once, making the system more fault-tolerant and reliable.

**Why Statelessness is Critical for Scalability**  
    Statelessness means that every request from a client to a server must contain all the information needed for the server to understand and process it. The server does not store any information about the client's session between requests (i.e., it doesn't remember who the client is or what they did before).
    This principle is a game-changer for scalability for one primary reason: It makes every server interchangeable.
    Imagine an application with rapidly growing traffic, like an e-commerce site during a Black Friday sale. To handle the load, you need to add more servers.
    **Stateful Architecture (The Problem):** If the server stores session data in its own memory (e.g., the user's shopping cart), you run into a huge problem. If User A starts their session on Server 1, all their subsequent requests must go to Server 1. If a load balancer sends them to Server 2, Server 2 has no idea what's in their cart, and the session breaks. This is called "sticky sessions," and it creates a scalability bottleneck. You can't just add new servers freely; you have to manage which user goes to which server, which is complex and brittle.
    **Stateless Architecture (The Solution):** In a stateless system, the server doesn't hold the "state" (like the shopping cart). Instead, the state is either managed by the client or stored in a shared, external data store (like a database or Redis).
    When a request comes in, any available server can handle it. Server 1, Server 2, or a brand new Server 10 can process the request because the request itself contains everything needed (e.g., an authentication token).

**Category 1: The API Contract & Design**  
    Use Nouns for Resources, Not Verbs in URIs: Your URIs should represent entities or resources. The 1) 1) HTTP method (GET, POST, DELETE) is the verb.
        > Good: GET /users, DELETE /users/123
        > Bad: GET /getAllUsers, POST /deleteUserById
    2) Use HTTP Methods Correctly and Semantically: Each method has a specific meaning. Honor it.
        > GET: Retrieve resources. Safe and idempotent.
        > POST: Create a new resource as a subordinate of a collection. Not idempotent.
        > PUT: Replace an existing resource entirely. Idempotent.
        > PATCH: Partially update an existing resource. Not guaranteed to be idempotent.
        > DELETE: Remove a resource. Idempotent.  
    3) Use Plural Nouns for Collections: This keeps your routes consistent and predictable.
        > Good: /users, /users/123/orders
        > Bad: /user, /user/123/order 
    4) Provide Sensible Nesting for Relationships (But Don't Go Too Deep): Nesting is great for showing clear relationships.
        > Good: GET /authors/123/books (Gets all books for author 123).
        > Warning: Avoid deep nesting like /authors/123/books/456/reviews/789. It creates long, brittle URIs. After one level of nesting, it's often better to use query parameters to filter, e.g., GET /reviews?bookId=456. 
    5) Be Stateless: We've discussed this, but it's a core design pillar. Ensure every request can be understood in isolation, without relying on server memory. Use JWTs or API keys for authentication state, passing them in the Authorization header.
**Category 2: Data Handling & Responses (The Conversation)** 
    This is about how your API communicates back to the client. Consistency is king.
    1) Use Consistent JSON Property Naming: Pick a convention and stick to it. The most common in the JavaScript world is camelCase. Even if your database uses snake_case, your API should transform it for the client.
        > Good: { "firstName": "Alex", "orderTotal": 100 }
        > Bad (in a JS context): { "first_name": "Alex", "order_total": 100 }
    2) Implement Robust Input Validation: Never trust data from the client. Validate everything at the boundary of your application (in your route handlers/controllers).
        > Node.js Tools: Use libraries like joi, zod, or express-validator.
        > Action: Reject any request with invalid data immediately with a 400 Bad Request and clear error messages.
    3) Use HTTP Status Codes Correctly and Consistently: Don't just default to 200 or 500. Be specific.
        > 200 OK: General success for GET, PUT, PATCH.
        > 201 Created: Success on a POST that creates a resource. Return a Location header pointing to the new resource (Location: /users/124).
        > 204 No Content: Success on a DELETE where there's nothing to return.
        > 400 Bad Request: Client-side validation failed.
        > 401 Unauthorized: Client is not authenticated (doesn't have a valid API key or JWT).
        > 403 Forbidden: Client is authenticated, but not authorized to perform this action (e.g., a non-admin trying to delete another user).
        > 404 Not Found: The requested resource does not exist. 
    4) Provide Standardized and Useful Error Payloads: When something goes wrong, give the client developer a clear, predictable error format. 
**Category 3: Performance, Security, and Evolution (The Real World)**
    1) Plan for Performance:
        > Pagination: Never return an entire database table. Force pagination on all collection endpoints (GET /users). Use query parameters like ?page=1&limit=100.
        > Filtering & Sorting: Allow clients to filter collections (?status=published) and sort them (?sort=-createdAt) to reduce the data they need to fetch and process.
        > Field Selection: Allow clients to request only the fields they need (?fields=id,name,email) to minimize payload size.
    2) Prioritize Security:
        > Always use HTTPS (TLS/SSL): Non-negotiable. Encrypts all data in transit.
        > Implement Rate Limiting: Protect your API from abuse and denial-of-service attacks. Use libraries like express-rate-limit.
        > Use a Security Linter/Scanner: Tools like npm audit and Snyk can help find vulnerabilities in your dependencies.
        > Don't Leak Implementation Details: Error messages should be helpful but shouldn't expose stack traces or internal system information.
    3) Plan for Evolution with Versioning: Your API will change. Don't break existing client applications. The most common and explicit method is to version in the URI.
        > Good: https://api.example.com/v1/users
        > When you have to make a breaking change, you can introduce v2 while maintaining v1 for legacy clients.
**4)Category 4: Developer Experience (The Human Factor)** 
    Write Excellent Documentation: If it's not documented, it doesn't exist. This is the single most important factor for API adoption.
        > The Standard: Use the OpenAPI Specification (formerly Swagger). It allows you to define your API contract in a structured way.
        > Benefits: From this single source of truth, you can auto-generate interactive documentation (like Swagger UI), generate client SDKs, and run contract tests. 
**5) Strong Authentication**
    **Node.js Actions:**
        **Password Hashing:** Never, ever store plain-text passwords. Use a strong, adaptive, salted hashing algorithm. bcrypt is the industry standard and the correct choice in Node.js.
        **JWT Security:** When using JSON Web Tokens, be mindful of common pitfalls:
            > Use a Strong Secret Key: Your JWT secret should be a long, high-entropy string, loaded securely from environment variables, not hardcoded.
            > Don't Store Sensitive Data in the Payload: The JWT payload is Base64 encoded, not encrypted. Anyone can read it. Store only non-sensitive identifiers like a userId.
            > Set an Expiration (exp): All tokens must have a short lifespan (e.g., 15 minutes to 1 hour). Use a refresh token mechanism for longer-lived sessions.
            > For Web Clients, Use httpOnly Cookies: To prevent XSS attacks from stealing JWTs, store them in httpOnly cookies instead of localStorage. 
**6) Granular and Enforced Authorization**  
        **What to Remember:** Authentication answers "Who are you?". Authorization answers "What are you allowed to do?". This is where most API vulnerabilities occur.
        **Node.js Actions:**
            > Check Permissions on Every Request: Do not assume that if a user has a valid token, they can do anything. Every endpoint that accesses or modifies a resource must verify that the authenticated user has permission to do so.
            > Prevent Insecure Direct Object References (IDOR): This is a classic, severe vulnerability.
                > Bad: GET /orders/123 -> The code just fetches order 123 from the database. Hacker with user ID 456 can change the URL to see another user's order.
                > Good: GET /orders/123 -> The code's logic must be: const order = findOrderById(123); if (order.userId !== req.user.id) { return res.status(403).send('Forbidden'); }.
            > Implement Role-Based Access Control (RBAC): Define clear roles (user, admin, editor). Your authorization logic (often in a middleware) should check req.user.role before allowing access to administrative endpoints. 
**7) Rigorous Input Validation**
    **What to Remember:** Trust Nothing from the Client. All input (req.body, req.params, req.query) must be treated as hostile until proven otherwise. This is your primary defense against injection attacks.
     **Node.js Actions:**
        > Use a dedicated validation library like joi, zod, or express-validator.
        > Define a strict schema for the expected data for every endpoint. Check for data types, required fields, string patterns (regex), and min/max values.
        > Immediately reject any request that fails validation with a 400 Bad Request. 
**8) Prevent Injections**
    **What to Remember:** Sanitizing user input is critical to prevent attackers from running their own code on your server or in other users' browsers.
    **Node.js Actions:**
        > SQL/NoSQL Injection: If you are not using an ORM/ODM (like Sequelize or Mongoose), or if you write raw queries, always use parameterized queries (prepared statements). Never concatenate user input directly into a database query string.
        > Cross-Site Scripting (XSS): While XSS is executed on the frontend, your API is often the source. The API must prevent storing malicious scripts. When accepting user input that might contain HTML/Markdown, sanitize it on save using a library like DOMPurify.                                           


**How Can I do the versioning of API**
Here are the most common strategies for versioning an API in Node.js, with examples using the Express.js framework.
**The Four Main Versioning Strategies**
    1) URI Path Versioning (Most Common)
    2) Query Parameter Versioning
    3) Custom Header Versioning
    4) Accept Header Versioning (Content Negotiation)

**URI Path Versioning**
This is the most popular and straightforward approach. The API version is embedded directly in the URL path.
    **How it looks:**
        > https://api.example.com/v1/users

        > https://api.example.com/v2/users
    **Pros:**    
        > Extremely clear and explicit. It's immediately obvious which version of the API is being used by looking at the URL.

        > Easy to implement in Express using routers.

        > Easy for developers to explore in a web browser.

        > Simple to log and debug.  
    **Cons:**
    Critics argue it violates REST principles, as a URI should point to a unique resource, not a versioned representation of it.
    Can lead to more complex routing rules in your application's code.
    `const express = require('express');
    const app = express();

    // Import the routers for each version
    const v1UserRoutes = require('./routes/v1/users.routes');
    const v1ProductRoutes = require('./routes/v1/products.routes');

    const v2UserRoutes = require('./routes/v2/users.routes');
    // ... and so on

    // Mount the routers on their respective versioned paths
    app.use('/api/v1/users', v1UserRoutes);
    app.use('/api/v1/products', v1ProductRoutes);

    app.use('/api/v2/users', v2UserRoutes);

    app.listen(3000, () => console.log('Server running...')); ` 

**2. Query Parameter Versioning**  
    The API version is specified as a query string parameter at the end of the URL.
    **How it looks:**
    https://api.example.com/users?version=1
    https://api.example.com/users?api-version=2.1

    **Pros:**
    Keeps the base URI cleaner.
    Can be easy to default to the "latest" version if the parameter is omitted.

    **Cons:**
    Less explicit than URI versioning.
    Can make routing logic more complex within a single route handler.
    Clutters the URL with implementation details. 

`    // In a single users.routes.js file
    router.get('/users', (req, res) => {
        const version = req.query.version;

        if (version === '1') {
            // Logic for V1
            return res.json({ version: 1, data: 'Some V1 user data' });
        }
        
        if (version === '2') {
            // Logic for V2
            return res.json({ version: 2, data: 'Some brand new V2 user data' });
        }

        // Default to latest version or throw an error
        res.status(400).json({ error: 'A valid version was not specified.' });
    });  ` 
    // In a single users.routes.js file
    `router.get('/users', (req, res) => {
        const version = req.query.version;

        if (version === '1') {
            // Logic for V1
            return res.json({ version: 1, data: 'Some V1 user data' });
        }
        
        if (version === '2') {
            // Logic for V2
            return res.json({ version: 2, data: 'Some brand new V2 user data' });
        }

        // Default to latest version or throw an error
        res.status(400).json({ error: 'A valid version was not specified.' });
    });`

**3. Custom Header Versioning**
    The API version is specified in a custom HTTP header.
    **How it looks:**
        Request Header: X-API-Version: 1
        Request Header: Api-Version: 2
        **Pros:**
        Keeps the URI completely clean and focused on the resource itself.
        Favored by some who believe it's a "purer" approach than cluttering the URL.
        **Cons:**
        Not visible. You cannot see the version just by looking at the URL, making it harder to test in a browser or share links.
        Requires clients to know how to modify HTTP headers, which is less intuitive than changing a URL.   
        `const handleV1 = (req, res) => res.json({ version: 1, data: 'V1 data' });
        const handleV2 = (req, res) => res.json({ version: 2, data: 'V2 data' });

        app.get('/api/users', (req, res, next) => {
            const version = req.headers['x-api-version'];

            if (version === '1') {
                return handleV1(req, res);
            }
            if (version === '2') {
                return handleV2(req, res);
            }
            
            // Default or send error
            next(new Error('Invalid or missing API version header'));
        }); `

**4. Accept Header Versioning (Content Negotiation)**
This is the most "academically correct" RESTful approach. It uses the standard Accept HTTP header to let the client specify the desired format and version of the resource.
    **How it looks:**
        Request Header: Accept: application/vnd.example.v1+json
        Request Header: Accept: application/vnd.example.v2+json
    **Pros**:
        Considered the purest implementation of REST and HATEOAS principles.
        Uses built-in HTTP functionality as it was intended.
    **Cons**:
        The most complex and verbose. It's difficult for humans to read and write.
        Many client libraries don't make it easy to modify the Accept header.
        Can be confusing for API consumers. 

        `app.get('/api/users', (req, res, next) => {
            const acceptHeader = req.headers.accept || '';

            if (acceptHeader.includes('application/vnd.example.v1+json')) {
                return res.json({ version: 1, message: 'Response using Accept header v1' });
            }

            if (acceptHeader.includes('application/vnd.example.v2+json')) {
                return res.json({ version: 2, message: 'Response using Accept header v2' });
            }

            next(new Error('Invalid media type in Accept header'));
        }); ` 

**How Does HTTP Work 🔥**
    **1. Privacy and Integrity**
        > HTTP sends data in plaintext without encryption.
        > It means someone on the public network can easily access or change the information.
        So it’s insecure.
    **2. Authentication**
        > HTTP doesn’t support a mechanism to check if the server is the right one.
        > It means someone else could pretend to be the server and steal the user's data.
        > So it became difficult to transfer sensitive information, such as passwords or credit card numbers.

**How Does HTTPS Work**
    > Imagine HTTPS as HTTP running over an extra protocol to keep information secure.
    > The extra protocol is called Transport Layer Security (TLS). Think of TLS as a mechanism to encrypt data sent between the client and server.
    > TLS creates a secure connection using a process called the TLS handshake. It's used to establish an HTTPS connection when a user visits a site.
    **Here’s how it works:**
        > The browser sends a message to the server.
        > It includes the list of supported cryptographic algorithms, TLS versions. And also a randomly generated string called client random.
        > The server then responds with its TLS certificate and supported cryptographic algorithm. Besides it includes a randomly generated string called server random.
        > Yet it’s important to confirm the server identity for authenticity. So the browser verifies the received TLS certificate with the certificate authority. Imagine the certificate authority as a trusted organization that verifies server identity.
        > But both client and server must have the same key to encrypt session data efficiently.
        > So the browser sends a temporary key (pre-master secret) to the server. While it’s encrypted using the server’s public key, which was taken from the TLS certificate.
        > Yet only the private key can decrypt the data that was encrypted using a public key. So the server decrypts the received pre-master secret using its private key. Thus making this data transfer secure.
        > Think of the public key as an email address; anybody can send messages to it. While the private key is like the inbox password, only the user with the password can read emails.
        > Both browser and server use the pre-master secret, server random, and client random to compute the same session key.
        > Think of the session key as a symmetric cryptographic key that can encrypt and decrypt data. It’s valid either for a set period or for as long as communication is ongoing.
        > All future communication then gets encrypted using the session key. It means nobody can see the messages on the public network.
        > Yet it’s necessary to check if the TLS handshake was successful.
        > So the browser sends a finished message, which is encrypted using the session key. The server then responds with a finished message, encrypted using the session key.
        > This marks the completion of a TLS handshake.
        > Put simply, the TLS certificate handles authentication, while the TLS protocol handles encryption.
        > Thus providing authenticity, confidentiality, and integrity in data transfer.

**How Databases Keep Passwords Securely 🔒**
    https://newsletter.systemdesign.one/p/how-to-store-passwords-in-database






