https://ahmedsalman74.medium.com/how-to-make-node-js-api-10-x-fast-using-cashing-f78f2677711e

# 1. In-Memory vs. Distributed Caching & Use Cases
**In-Memory Caching:**
    **Definition**: Data is stored directly within the application's memory (RAM) where it runs. Each Node.js process has its own isolated cache.
    **Characteristics**:
        **Pros**: 
        > Extremely fast access times (lowest latency) as no network call is involved. Simple to set up for a single application instance.
        **Cons**:
        > Limited Capacity: Bounded by the available RAM of the single Node.js process.
        > Non-Shared: If you run multiple Node.js processes (e.g., with cluster or on different servers), each process has its own cache. This leads to cache inconsistency if data changes, as each process might serve stale data until its individual cache expires/updates.
        > Volatile: Cache is lost if the Node.js process restarts.
    **Primary Use Cases:**
        > Single-instance applications: When you only run one Node.js process.
        > Local, frequently accessed configurations or lookup tables: Data that is static or changes very infrequently and needs ultra-low latency access (e.g., feature flags, small static product categories).
        > Small, process-specific data: Temporary data that doesn't need to be shared across multiple instances.

**Distributed Caching (e.g., Redis, Memcached):**
    **Definition**: Data is stored in a separate, dedicated cache server or cluster that is accessible over the network by multiple application instances.
    **Characteristics**:
        **Pros**:
            > Shared State: All Node.js application instances can access the same cached data, ensuring consistency across your entire application fleet.
            > Scalable: Cache servers can be scaled independently of your application servers.
            > Persistent (optional): Many distributed caches (like Redis) can be configured for persistence, meaning data isn't lost on cache server restart.
            > Higher Capacity: Can store much larger datasets than a single application's memory.
        **Cons**:
            > Higher Latency: Involves a network round-trip to fetch data, which is slower than in-memory access.
            > Operational Overhead: Requires setting up, managing, and monitoring a separate cache server/cluster.
            > Cost: Running dedicated cache infrastructure incurs costs.
    **Primary Use Cases:**
        > Multi-instance applications: When you need a shared, consistent cache across multiple Node.js processes (e.g., a clustered application, microservices).
        > Session Management: Storing user sessions in a way that allows any server to handle subsequent requests from the same user.
        > Rate Limiting: Storing counters for API rate limits.
        > Expensive Query Results: Caching the results of complex database queries or external API calls that are frequently requested.

**Trade-offs & Scenarios:**
    **Choose In-Memory when**: You prioritize absolute lowest latency for non-critical, non-shared data, or your application is strictly a single instance.
    Scenario: A development-only environment running a single Node.js instance, caching configuration settings.
    **Choose Distributed when**: You need cache consistency across multiple application instances, higher cache capacity, or data persistence. This is the default choice for most production-grade, scalable Node.js applications.
    Scenario: A production e-commerce API running multiple Node.js instances behind a load balancer, caching product listings and user session tokens. 

# 2. Cache Invalidation Strategies
Cache invalidation is the process of removing or updating stale data from the cache to ensure that users always receive the most up-to-date information. It's often cited as one of the hardest problems in computer science.
Here are three common strategies:
    **Time-To-Live (TTL):**
        > Description: Each cached item is given an expiration time. After this time, the item is considered stale and is either automatically removed or re-fetched on the next request. This is the simplest and most common strategy.
        > Pros: Easy to implement.
        > Cons: Data can be stale for the duration of the TTL. Not suitable for highly sensitive or rapidly changing data.
        > Use Case: Frequently accessed, moderately changing data (e.g., product listings, news articles).
    **Write-Through:**
        > Description: When data is written/updated, it is first written to the cache, and then synchronously written to the underlying database. The cache is always up-to-date with the database.
        > Pros: Cache is always consistent with the database.
        > Cons: Higher write latency due to writing to both cache and database. If the cache fails, the write operation might fail or experience inconsistency.
        > Use Case: Data where immediate consistency between cache and database is critical.
    **Cache-Aside with Explicit Invalidation:**
        > Description: The application directly interacts with both the cache and the database. On a read, it first checks the cache. If found, it returns the cached data ("cache hit"). If not found, it fetches from the database, stores it in the cache, and then returns it ("cache miss"). On a write/update, the application first updates the database, and then explicitly invalidates (deletes) the corresponding entry from the cache. The next read will then incur a cache miss and fetch fresh data from the database.
        > Pros: Simple read/write operations. Ensures freshness on updates. Good for read-heavy workloads.
        > Cons: "Stale read" window: between the database update and cache invalidation, a read might still get stale data. Initial cache misses can be slow.
        > Use Case: Most common and flexible strategy for many read-heavy applications where eventual consistency is acceptable.
        `const Redis = require('ioredis');
        const redis = new Redis(); // Connects to localhost:6379

        // Simulate a database
        const database = {
        products: {
            'prod-101': { id: 'prod-101', name: 'Laptop', price: 1200, stock: 50 },
            'prod-102': { id: 'prod-102', name: 'Mouse', price: 25, stock: 200 },
        }
        };

        async function getProductFromDB(productId) {
        console.log(`[DB] Fetching product ${productId} from database...`);
        return new Promise(resolve => setTimeout(() => resolve(database.products[productId]), 200)); // Simulate async DB call
        }

        async function updateProductInDB(productId, updates) {
        console.log(`[DB] Updating product ${productId} in database...`);
        return new Promise(resolve => {
            setTimeout(() => {
            if (database.products[productId]) {
                database.products[productId] = { ...database.products[productId], ...updates };
                resolve(database.products[productId]);
            } else {
                resolve(null);
            }
            }, 200);
        });
        }

        // --- API Layer with Cache-Aside ---

        const CACHE_TTL = 3600; // Cache for 1 hour

        async function getProduct(productId) {
        const cacheKey = `product:${productId}`;
        let productData = await redis.get(cacheKey); // 1. Check cache

        if (productData) {
            console.log(`[Cache] Hit for ${cacheKey}`);
            return JSON.parse(productData);
        }

        console.log(`[Cache] Miss for ${cacheKey}`);
        const product = await getProductFromDB(productId); // 2. If miss, fetch from DB

        if (product) {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(product)); // 3. Store in cache
        }
        return product;
        }

        async function updateProduct(productId, updates) {
        const cacheKey = `product:${productId}`;
        const updatedProduct = await updateProductInDB(productId, updates); // 1. Update DB

        if (updatedProduct) {
            await redis.del(cacheKey); // 2. Invalidate (delete) from cache
            console.log(`[Cache] Invalidated ${cacheKey}`);
        }
        return updatedProduct;
        }

        // --- Usage Example ---
        (async () => {
        console.log('--- Initial Fetch (Cache Miss) ---');
        let product = await getProduct('prod-101');
        console.log('Product 101:', product); // Fetches from DB, caches

        console.log('\n--- Subsequent Fetch (Cache Hit) ---');
        product = await getProduct('prod-101');
        console.log('Product 101:', product); // Fetches from cache

        console.log('\n--- Update Product (Invalidates Cache) ---');
        await updateProduct('prod-101', { price: 1250, stock: 45 });
        console.log('Product 101 after update:', database.products['prod-101']); // Directly from DB representation

        console.log('\n--- Fetch After Update (Cache Miss again, then re-caches) ---');
        product = await getProduct('prod-101');
        console.log('Product 101:', product); // Fetches from DB again, re-caches
        })();`

# 3. Cache Stampede & Mitigation
**Definition**:
    A "cache stampede" (also known as the "thundering herd problem") occurs when a cached item expires, and then a large number of concurrent requests for that item simultaneously hit the application. Since the item is no longer in the cache, all these requests bypass the cache and hit the backend data store (e.g., database, external API) at once. This sudden surge in load can overwhelm the backend, leading to performance degradation, slow responses, and even crashes, which in turn can cause more cache misses and exacerbate the problem.
    **Cache Locking (or Request Collapsing):**
        **Description**: When a cache miss occurs, the first request attempts to fetch the data from the backend. All subsequent concurrent requests for the same expired item are blocked or held in a queue (or more efficiently, subscribe to the result of the first ongoing request) until the data is retrieved and re-cached. Once the data is re-cached, all pending requests are served from the newly populated cache.
        **Pros**: Prevents multiple calls to the backend. Efficiently serves all waiting requests once the data is ready.
        **Cons**: Can introduce latency for the waiting requests. Requires careful implementation to avoid deadlocks or excessive queueing.
        **Implementation**: Often involves using a mutex (lock) or a promise-based approach where all pending requests await a single promise that resolves with the data.
    **Pre-fetching/Proactive Caching:**
        **Description**: Instead of waiting for an item to expire, proactively refresh it in the background before its TTL is reached. This is done by monitoring cache item usage or using a separate background job to refresh popular items.
        **Pros**: Ensures fresh data is almost always available. Avoids stampede entirely as items don't fully expire.
        **Cons**: Can consume more resources for background refreshes. Requires identifying "popular" items that warrant pre-fetching. Not suitable for all data patterns (e.g., highly dynamic, rarely accessed).
        **Implementation**: A separate cron job or a dedicated worker thread that periodically updates cache entries based on observed access patterns or predictive models.
    **Graceful Degradation (Stale-While-Revalidate):**
        **Description**: When a cached item expires, instead of immediately returning a cache miss, the application serves the stale cached data to the user while asynchronously initiating a background re-fetch from the backend to update the cache.
        **Pros**: Users always get a fast response (even if slightly stale). Only one background re-fetch occurs, preventing stampede.
        **Cons**: Users might see slightly stale data temporarily. Adds complexity to cache logic.
        **Implementation**: Store not just the value, but also the last validation time. If past TTL, serve stale, but trigger an async re-fetch.




