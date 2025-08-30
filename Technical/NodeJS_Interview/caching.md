**How do you approach caching in a Node.js application to improve performance? Provide examples of different caching strategies.**
    Caching is a crucial technique for reducing latency and improving the performance and scalability of Node.js applications by storing frequently accessed data, so it can be retrieved faster than re-computing or re-fetching it.
    1) In-Memory Caching (Application-level Cache):
        > Description: Stores data directly in the application's memory. Fastest access but not scalable across multiple instances and data is lost on restart.
        >  Use Cases: Frequently accessed, non-sensitive data, lookup tables, configuration settings.
        Example: Using node-cache or a simple Map object.
        `const NodeCache = require('node-cache');
        const myCache = new NodeCache({ stdTTL: 300, checkperiod: 120 }); // TTL: 5 minutes

        async function getExpensiveData(id) {
            let data = myCache.get(id);
            if (data) {
                console.log(`Cache hit for ${id}`);
                return data;
            }

            console.log(`Cache miss for ${id}, fetching from DB...`);
            // Simulate fetching from a database
            data = await fetchDataFromDatabase(id);
            myCache.set(id, data); // Store in cache
            return data;
        }`
    2) Distributed Caching (e.g., Redis, Memcached):
        > Description: Uses an external, dedicated cache server. Scalable across multiple application instances, data persists across application restarts (for Redis with persistence). More overhead than in-memory but significantly faster than a database.
        > Use Cases: Session management, full-page caching, API response caching, user profiles, leaderboards.
        Example (using Redis): 
        `const redis = require('redis');
        const client = redis.createClient(); // Connects to default Redis on 6379

        client.on('error', (err) => console.log('Redis Client Error', err));
        (async () => { await client.connect(); })(); // Connect the client

        async function getExpensiveDataWithRedis(id) {
            const cachedData = await client.get(id);
            if (cachedData) {
                console.log(`Redis Cache hit for ${id}`);
                return JSON.parse(cachedData);
            }

            console.log(`Redis Cache miss for ${id}, fetching from DB...`);
            const data = await fetchDataFromDatabase(id);
            await client.setEx(id, 3600, JSON.stringify(data)); // Set with 1-hour expiration
            return data;
        } ` 

    3) HTTP Caching (Browser/Proxy Cache):
        > Description: Leverages HTTP headers (Cache-Control, Expires, ETag, Last-Modified) to instruct browsers or intermediate proxies to cache responses.
        > Use Cases: Static assets (images, CSS, JS), API responses for public data that changes infrequently.
        Example (Express.js):     
