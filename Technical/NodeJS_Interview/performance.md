**How do you identify and prevent memory leaks in a Node.js application?**
    Memory leaks in Node.js occur when the application unintentionally retains references to objects that are no longer needed, preventing the garbage collector from reclaiming their memory. This leads to increased memory consumption, degraded performance, and potential crashes.
    **Common Causes of Memory Leaks:**
        1) Unclosed Resources: Unreleased database connections, file handles, network sockets.
        2) Excessive Global Variables: Objects inadvertently assigned to the global scope (global or 3) window in browser context or implicitly created without var, let, const.
        3) Unremoved Event Listeners: Event listeners that are added but never removed, keeping references to objects.
        4) Improper Caching: Caches that grow indefinitely without an eviction policy.
        5) Closures: Variables unintentionally retained within closures even after their containing function has finished.
        6) Timers: setTimeout or setInterval not cleared, holding references.
        Large Object References: Keeping references to large objects in memory longer than necessary.
    **Identification Tools and Techniques:**
        > process.memoryUsage(): Built-in Node.js function to get a snapshot of memory usage (rss, heapTotal, heapUsed). Monitor this over time for abnormal growth.[22][32][34]
        Chrome DevTools (with --inspect): Run your Node.js app with node --inspect. Open chrome://inspect in Chrome and connect to your application. Use the "Memory" tab to:[30][31][32][34][35]
        > Take Heap Snapshots: Capture the memory state at different times and compare them to find growing object counts or sizes.[30][32][34]
        > Allocation Timeline: Record memory allocations over time to pinpoint where memory is being allocated and potentially leaked.
        Retainers Panel: Helps identify why objects are still being held in memory (who is retaining them).[34]
        Profiling Tools:
        > Clinic.js: A powerful tool for diagnosing performance and memory issues, including clinic doctor for general health, clinic flame for CPU, and clinic bubbleprof for async operations.[31][32]
        > --trace-gc: Node.js flag to log garbage collection activity.[34]
        APM Tools (e.g., New Relic, Datadog): Provide real-time monitoring and historical data of memory usage.[34][35]
    **Prevention Best Practices:**
        > Declare Variables Properly: Always use let, const, or var to avoid accidental global variables.
        > Clear Timers and Event Listeners: Ensure clearTimeout() and clearInterval() are called for timers, and removeListener() or off() are used for event listeners when they are no longer needed.
        > Efficient Caching: Implement proper cache eviction strategies (LRU, LFU) and set limits on cache size.
        > Streams for Large Data: Process large data using streams to avoid loading everything into memory.
        > Nullify References: Explicitly set variables referencing large objects to null when they are no longer needed, allowing the garbage collector to reclaim memory.[30]
        > Use WeakMap/WeakSet: For non-critical caches where objects can be garbage collected if no other strong references exist.[31]
        > Minimize Object Creation: Especially in tight loops, create objects only when necessary.[22]
        Code Reviews: Peer code reviews can help spot potential memory leak patterns.
    
    
