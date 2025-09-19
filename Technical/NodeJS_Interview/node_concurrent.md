**1. Cluster Pattern: Unlock Multi-Core Power :** 
https://ahmedsalman74.medium.com/the-power-of-clustering-in-node-js-for-optimal-performance-1a33cab4526f

Node.js runs single-threaded by default, which becomes a limitation on multi-core servers. 
The Cluster pattern allows you to fork your app into multiple child processes that share the same server port. Each process runs on a different CPU core.
    `const cluster = require('cluster');
    const http = require('http');
    const numCPUs = require('os').cpus().length;
    if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Fork a worker for each CPU
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking new worker...`);
        cluster.fork(); // Replace dead workers
    });
    } else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from Worker ${process.pid}!\n`);
    }).listen(8000);
    console.log(`Worker ${process.pid} started`);
    }`

**What is Node.js cluster?**
Node.js cluster is a module that allows developers to create child processes, or workers, to run simultaneously and share the same server port, enabling efficient utilization of CPU cores in multi-core systems. 

**Why is clustering beneficial in Node.js?**
Clustering in Node.js enables the distribution of tasks across multiple CPU cores, leading to improved application performance and scalability, particularly on multi-core systems.

**How can I handle worker process crashes in a Node.js cluster?**
You can handle worker process crashes by listening for the exit event on the cluster object and automatically restarting the worker processes if they exit unexpectedly

**The need for clustering in Node.js :**
Node.js operates within a single-threaded event loop, limiting its scalability on multi-core systems. Clustering addresses this limitation by distributing workload across multiple processes, ensuring efficient resource utilization.

**Advantages of using clustering in Node.js:**
    > Improved performance: Utilizes all CPU cores, enhancing processing power.
    > Enhanced scalability: Facilitates horizontal scaling to handle a larger volume of requests.
    > Fault tolerance: Automatically restarts failed worker processes, ensuring uninterrupted service availability.
    > Efficient resource utilization: Optimizes resource usage, reducing wastage and maximizing cost-effectiveness.

# 2) Worker Threads
https://article.arunangshudas.com/worker-threads-in-node-js-a27ffe73a6b7  
Brief: For offloading CPU-intensive tasks (e.g., complex calculations, image processing, data compression) to a separate thread within the same Node.js process. This prevents the main Event Loop from being blocked, ensuring the primary application remains responsive for handling concurrent requests.

# 3) Asynchronous I/O (Non-blocking Operations)
Node.js inherently promotes non-blocking I/O. Always favor asynchronous versions of operations (e.g., fs.readFile over fs.readFileSync, database drivers that use callbacks/promises) to keep the Event Loop free to process other incoming requests while waiting for I/O operations to complete.
    const fs = require('fs');
    // Synchronous (BAD for concurrency)
    // const data = fs.readFileSync('/path/to/file.txt', 'utf8');

    // Asynchronous (GOOD for concurrency)
    fs.readFile('/path/to/file.txt', 'utf8', (err, data) => {
    if (err) console.error(err);
    // Process data
    });
    // Or using Promises/async-await:
    async function loadData() {
    try {
        const data = await fs.promises.readFile('/path/to/file.txt', 'utf8');
        // Process data
    } catch (err) {
        console.error(err);
    }
    }

# 4) Connection Pooling
    Brief: For external services like databases or message brokers, creating a new connection for every request is resource-intensive. Connection pooling reuses existing connections, reducing overhead and improving response times under high load.
    `const { Pool } = require('pg'); // Example using 'pg' for PostgreSQL
    const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'mydb',
    password: 'password',
    port: 5432,
    max: 10, // Max number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
    });

    async function getUser(id) {
    const client = await pool.connect(); // Get a client from the pool
    try {
        const res = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    } finally {
        client.release(); // Release the client back to the pool
    }
    }`

# 5) Caching (In-memory & Distributed)
Brief: Storing frequently accessed data (results of expensive computations, database queries, API responses) closer to the application reduces the need to re-compute or re-fetch them. This significantly lowers latency and reduces load on backend services, enabling higher concurrency.
    `const Redis = require('ioredis');
    const redis = new Redis(); // Connects to localhost:6379

    async function getProductDetails(productId) {
    const cacheKey = `product:${productId}`;
    let product = await redis.get(cacheKey);

    if (product) {
        return JSON.parse(product); // Return from cache
    }

    // Simulate fetching from DB (expensive)
    product = await fetchProductFromDatabase(productId);
    if (product) {
        await redis.setex(cacheKey, 3600, JSON.stringify(product)); // Cache for 1 hour
    }
    return product;
    }  `  

# 6) Message Queues / Event-Driven Architecture
Brief: Decouples heavy or long-running tasks from the main request/response flow. Instead of processing a task immediately, publish it to a message queue (e.g., RabbitMQ, Kafka, AWS SQS). A separate worker process consumes tasks from the queue asynchronously. This keeps the API responsive and handles spikes in load gracefully. 

# 7) Streams & Backpressure
Brief: Efficiently process large amounts of data in chunks, rather than loading everything into memory. Backpressure is a mechanism to prevent a Writable stream from being overwhelmed by a Readable stream producing data too quickly, ensuring memory efficiency and stability under high data throughput.
    `const fs = require('fs');
    const zlib = require('zlib'); // For gzip compression

    const readableStream = fs.createReadStream('large_input.txt');
    const gzipStream = zlib.createGzip();
    const writableStream = fs.createWriteStream('large_input.txt.gz');

    readableStream
    .pipe(gzipStream) // Data is piped and compressed
    .pipe(writableStream) // Compressed data is written
    .on('finish', () => console.log('File compressed successfully!'))
    .on('error', (err) => console.error('Stream error:', err));
    // pipe() automatically manages backpressure: if writableStream slows down,
    // gzipStream will slow down, and readableStream will pause reading.
`

# 8) Statelessness
Brief: Design your application so that any client request can be handled by any available server instance without relying on local session state. This makes horizontal scaling (adding more instances) straightforward and greatly improves resilience and concurrency. Session data should be stored externally (e.g., Redis, database).
    `// Bad (stateful, cannot scale easily)
    // const sessions = {}; // In-memory object for user sessions
    // app.post('/login', (req, res) => {
    //   sessions[req.body.username] = { userId: req.body.userId, loggedIn: true };
    // });

    // Good (stateless with external session store or JWT)
    const jwt = require('jsonwebtoken');
    const SECRET_KEY = 'supersecret';

    app.post('/login', (req, res) => {
    // Authenticate user
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token }); // Client receives token, sends it with subsequent requests
    });

    app.get('/profile', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        // Access user ID from decoded token (no server-side session needed)
        res.json({ userId: decoded.userId, data: 'user profile' });
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
    });`

# 9) Load Balancing (External)
Brief: While Node.js clustering is internal, an external load balancer (like Nginx, HAProxy, AWS ELB, Google Cloud Load Balancer) distributes incoming traffic across multiple instances of your Node.js application running on different servers. This is essential for scaling beyond a single machine and for achieving high availability. 

# 10) Circuit Breakers and Retries
Brief: When interacting with external services (microservices, databases, third-party APIs), failures can occur.
    > Retries with Exponential Backoff: Attempt a failed request again after a delay, increasing the delay with each subsequent attempt to avoid overwhelming the failing service.
    > Circuit Breaker: Prevents an application from repeatedly trying to access a failing service. After a certain number of failures, the circuit "trips," and subsequent requests immediately fail for a predefined period, giving the service time to recover.

    `const CircuitBreaker = require('opossum');

    async function callExternalService() {
    // Simulate an external API call
    if (Math.random() > 0.7) { // Simulate 30% failure rate
        throw new Error('External service failed!');
    }
    return 'Data from external service';
    }

    const options = {
    timeout: 3000, // If callExternalService takes longer than 3s, it's a failure
    errorThresholdPercentage: 50, // If 50% of requests fail, open the circuit
    resetTimeout: 10000, // After 10s, try one request to see if service recovered
    };
    const breaker = new CircuitBreaker(callExternalService, options);

    breaker.fallback(() => 'Service is currently unavailable. Using fallback data.');

    async function getServiceData() {
    try {
        return await breaker.fire();
    } catch (e) {
        console.warn('Circuit breaker tripped or fallback used:', e.message);
        throw e; // Or handle with a more sophisticated fallback
    }
    }
    // Usage: getServiceData().then(data => console.log(data));`
