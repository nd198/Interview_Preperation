// Implement a custom Event Emitter class in Node.js. The class should have methods `on`, `off`, `emit`, 
// and `once` to handle event subscription, 
// unsubscription, one-time subscription, and event emission.

console.log("Hello, World!");
/**
 * A custom Event Emitter class.
 * Manages event subscriptions, unsubscriptions, and emission.
 */
class MyEventEmitter {
    constructor() {
        // A Map to store event names as keys and arrays of listener functions as values.
        // Using Map for better performance with string keys and direct iteration.
        this.events = new Map();
    }

    /**
     * Registers a new event listener for the specified eventName.
     *
     * @param {string} eventName The name of the event to listen for.
     * @param {Function} listener The callback function to execute when the event is emitted.
     * @returns {MyEventEmitter} The emitter instance for chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    on(eventName, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('Listener must be a function');
        }

        // If the eventName doesn't exist, initialize it with an empty array.
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        // Add the listener to the array of listeners for this event.
        this.events.get(eventName).push(listener);
        return this; // Enable chaining
    }

    /**
     * Removes a specific event listener for the specified eventName.
     *
     * @param {string} eventName The name of the event.
     * @param {Function} listener The specific listener function to remove.
     * @returns {MyEventEmitter} The emitter instance for chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    off(eventName, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('Listener must be a function');
        }

        // If there are no listeners for this event, there's nothing to remove.
        if (!this.events.has(eventName)) {
            return this;
        }

        const listeners = this.events.get(eventName);
        // Find the index of the listener to remove.
        const index = listeners.indexOf(listener);

        if (index !== -1) {
            // Remove the listener using splice.
            listeners.splice(index, 1);
        }

        // If no more listeners remain for this event, clean up the event entry from the Map.
        if (listeners.length === 0) {
            this.events.delete(eventName);
        }
        return this; // Enable chaining
    }

    /**
     * Emits the specified event, calling all registered listeners with the provided arguments.
     *
     * @param {string} eventName The name of the event to emit.
     * @param {...any} args Arguments to pass to the listeners.
     * @returns {boolean} True if listeners were called, false otherwise.
     */
    emit(eventName, ...args) {
        // If no listeners are registered for this event, do nothing.
        if (!this.events.has(eventName)) {
            return false;
        }

        // Create a shallow copy of the listeners array BEFORE iterating.
        // This is crucial to prevent issues if a listener removes itself (e.g., 'once')
        // or other listeners during the emission cycle.
        const listeners = [...this.events.get(eventName)];

        for (const listener of listeners) {
            try {
                // Call each listener with the provided arguments.
                // Using try-catch to ensure that an error in one listener doesn't stop others.
                listener(...args);
            } catch (error) {
                console.error(`Error in listener for event '${eventName}':`, error);
                // In a real-world scenario, you might emit an 'error' event here
                // if this Event Emitter is supposed to handle errors internally.
            }
        }
        return true; // Indicates that the event was emitted and listeners (if any) were processed.
    }

    /**
     * Registers a listener that will be invoked only once for the specified eventName,
     * after which it will be automatically removed.
     *
     * @param {string} eventName The name of the event.
     * @param {Function} listener The callback function to execute once.
     * @returns {MyEventEmitter} The emitter instance for chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    once(eventName, listener) {
        if (typeof listener !== 'function') {
            throw new TypeError('Listener must be a function');
        }

        // Create a wrapper function that will:
        // 1. Remove itself from the listeners.
        // 2. Call the original listener.
        const wrapper = (...args) => {
            // Remove this wrapper function first.
            // This prevents potential infinite loops if the original listener
            // synchronously re-emits the same event.
            this.off(eventName, wrapper);
            // Then, execute the original listener.
            listener(...args);
        };

        // Store a reference to the original listener on the wrapper.
        // This is a common pattern in Node.js's EventEmitter, which helps if you
        // ever needed to specifically target the *original* listener for removal
        // (though our `off` requires the exact function reference).
        wrapper.listener = listener;

        // Register the wrapper function as the actual listener.
        this.on(eventName, wrapper);
        return this; // Enable chaining
    }

    /**
     * Returns the number of listeners for a given event.
     * (Optional, but useful for testing/debugging)
     * @param {string} eventName The name of the event.
     * @returns {number} The number of listeners for the event.
     */
    listenerCount(eventName) {
        return this.events.has(eventName) ? this.events.get(eventName).length : 0;
    }
}

// --- Demonstration and Testing ---

console.log('--- MyEventEmitter Demonstration ---');

const myEmitter = new MyEventEmitter();

// --- Test `on` and `emit` ---
console.log('\n--- Test: Basic `on` and `emit` ---');
let count = 0;
const greetListener1 = (name) => {
    console.log(`Hello, ${name}! (Listener 1)`);
    count++;
};
const greetListener2 = (name, greeting) => {
    console.log(`${greeting}, ${name}! (Listener 2)`);
    count++;
};

myEmitter.on('greet', greetListener1);
myEmitter.on('greet', greetListener2);

console.log('Emitting "greet" event...');
myEmitter.emit('greet', 'Alice', 'Hi'); // Both listeners should fire
console.log(`Listeners fired count: ${count}`); // Expected: 2

console.log('\nEmitting "greet" again...');
myEmitter.emit('greet', 'Bob', 'Yo'); // Both listeners should fire again
console.log(`Listeners fired count: ${count}`); // Expected: 4

// --- Test `off` ---
console.log('\n--- Test: `off` a specific listener ---');
myEmitter.off('greet', greetListener1);
console.log('Removed greetListener1. Emitting "greet" again...');
myEmitter.emit('greet', 'Charlie', 'Hey'); // Only greetListener2 should fire
console.log(`Listeners fired count: ${count}`); // Expected: 5

// Try to remove a non-existent listener
console.log('Attempting to remove non-existent listener...');
myEmitter.off('nonExistent', () => {}); // Should do nothing, no error
console.log('Listeners for "greet":', myEmitter.listenerCount('greet')); // Expected: 1

// --- Test `once` ---
console.log('\n--- Test: `once` listener ---');
const onceListener = (message) => {
    console.log(`This runs ONCE: ${message}`);
    count++;
};

myEmitter.once('singleUse', onceListener);
console.log('Listeners for "singleUse" before emit:', myEmitter.listenerCount('singleUse')); // Expected: 1

console.log('Emitting "singleUse" first time...');
myEmitter.emit('singleUse', 'First call'); // Should fire
console.log(`Listeners fired count: ${count}`); // Expected: 6
console.log('Listeners for "singleUse" after first emit:', myEmitter.listenerCount('singleUse')); // Expected: 0

console.log('Emitting "singleUse" second time...');
myEmitter.emit('singleUse', 'Second call'); // Should NOT fire
console.log(`Listeners fired count: ${count}`); // Expected: 6 (no change)

// --- Test no listeners ---
console.log('\n--- Test: Emitting an event with no listeners ---');
const emitted = myEmitter.emit('nonExistentEvent', 'data');
console.log(`Event "nonExistentEvent" emitted? ${emitted}`); // Expected: false

// // --- Test chaining ---
// console.log('\n--- Test: Chaining ---');
// myEmitter
//     .on('chained', () => console.log('Chained listener 1'))
//     .on('chained', () => console.log('Chained listener 2'))
//     .emit('chained');

// // --- Test error handling in listeners ---
// console.log('\n--- Test: Error in listener ---');
// myEmitter.on('errorEvent', () => {
//     throw new Error('Something went wrong in this listener!');
// });
// myEmitter.on('errorEvent', (data) => console.log(`Another listener for errorEvent: ${data}`));

// console.log('Emitting "errorEvent" (expecting an error in console)...');
// myEmitter.emit('errorEvent', 'Payload');

// // --- Test `off` when no more listeners remain ---
// console.log('\n--- Test: `off` last listener to clean up event entry ---');
// myEmitter.off('greet', greetListener2); // Remove the last 'greet' listener
// console.log('Listeners for "greet" after removing last one:', myEmitter.listenerCount('greet')); // Expected: 0
// console.log('Does `events` map have "greet"?', myEmitter.events.has('greet')); // Expected: false