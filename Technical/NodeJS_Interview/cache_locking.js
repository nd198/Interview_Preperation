const Redis = require('ioredis');
const redis = new Redis();

// Simulate a database
const database = {
  products: {
    'prod-101': { id: 'prod-101', name: 'Laptop', price: 1200, stock: 50 },
  }
};

async function getProductFromDB(productId) {
  console.log(`[DB] ACTUALLY FETCHING product ${productId} from database...`);
  return new Promise(resolve => setTimeout(() => resolve(database.products[productId]), 500)); // Simulate slow DB call
}

const CACHE_TTL = 5; // Cache for 5 seconds (for demonstration of expiry)
const ONGOING_FETCHES = new Map(); // Stores Promises for items currently being fetched

async function getProductWithStampedeMitigation(productId) {
  const cacheKey = `product:${productId}`;

  // 1. Check Redis cache
  let productData = await redis.get(cacheKey);
  if (productData) {
    console.log(`[Cache] Hit for ${cacheKey}`);
    return JSON.parse(productData);
  }

  // 2. Cache Miss: Check if another request is already fetching this item
  if (ONGOING_FETCHES.has(cacheKey)) {
    console.log(`[Cache] Miss for ${cacheKey}. Waiting for ongoing fetch...`);
    // If an ongoing fetch exists, wait for its promise to resolve
    return ONGOING_FETCHES.get(cacheKey);
  }

  // 3. No ongoing fetch: This is the first request to hit the DB
  console.log(`[Cache] Miss for ${cacheKey}. Initiating new fetch...`);
  const fetchPromise = (async () => {
    try {
      const product = await getProductFromDB(productId); // Fetch from DB
      if (product) {
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(product)); // Store in cache
      }
      return product;
    } finally {
      ONGOING_FETCHES.delete(cacheKey); // Remove promise once resolved/rejected
    }
  })();

  ONGOING_FETCHES.set(cacheKey, fetchPromise); // Store the promise
  return fetchPromise; // Return the promise for others to await
}

// --- Usage Example ---
(async () => {
  console.log('--- Simulate multiple concurrent requests after cache expiry ---');

  // First batch of requests (all hit cache miss simultaneously)
  const requests1 = Array.from({ length: 5 }, (_, i) =>
    getProductWithStampedeMitigation('prod-101')
  );
  await Promise.all(requests1);
  console.log('\nAll initial requests completed. Cache is now populated.');

  // Wait for cache to expire
  console.log(`\nWaiting for ${CACHE_TTL} seconds for cache to expire...`);
  await new Promise(resolve => setTimeout(resolve, (CACHE_TTL * 1000) + 500)); // Just over TTL

  console.log('\n--- Cache expired. Second batch of requests (will trigger stampede mitigation) ---');
  // Second batch of requests (all hit cache miss simultaneously after expiry)
  const requests2 = Array.from({ length: 5 }, (_, i) =>
    getProductWithStampedeMitigation('prod-101')
  );

  const results = await Promise.all(requests2);
  results.forEach((res, i) => console.log(`Request ${i + 1} received:`, res.name));

  console.log('\nObservation: The "[DB] ACTUALLY FETCHING..." message should appear only twice (once for each batch of concurrent requests after expiry).');

})();