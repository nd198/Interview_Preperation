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

