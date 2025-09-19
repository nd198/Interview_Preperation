**what is Prototype**
    In JavaScript, a prototype is an object that acts as a blueprint or template for other objects, enabling inheritance and the sharing of properties and methods. When an object is created, it can inherit properties and methods from its prototype, promoting code reuse and efficiency. 
    Here's how prototypes work with an example: Constructor Functions and prototype Property.
    When a constructor function is defined in JavaScript, it automatically gets a prototype property. This prototype property is an object where you can add methods and properties that will be inherited by all instances created from that constructor function.

    `function Animal(name) {
        this.name = name;
    }

    // Adding a method to the prototype of Animal
    Animal.prototype.speak = function() {
        console.log(`${this.name} makes a sound.`);
    };

    const dog = new Animal("Dog");
    const cat = new Animal("Cat");

    dog.speak(); // Output: Dog makes a sound.
    cat.speak(); // Output: Cat makes a sound.`

**what is the behaviour of this in normal and arrow function**
**Normal Functions (function keyword)**: The value of this is determined by how the function is called (the "execution context"). It's dynamic.
**Arrow Functions (=>)**: The value of this is determined by where the function is defined (the "lexical context"). It's static and inherits this from its parent scope.

1. **Normal Functions (function declarations and expressions)**
    **Method Call**
        When a function is called as a method of an object, this refers to the object itself.
        `const person = {
        name: 'Neha',
        greet: function() {
            // 'this' refers to the 'person' object
            console.log(`Hello, my name is ${this.name}.`); 
        }
        };

        person.greet(); // Output: Hello, my name is Neha.`

    **Simple Function Call (Global Context)**
        When a function is called on its own (not as an object method), this refers to the global object (window in browsers, global in Node.js). In "strict mode" ('use strict'), this will be undefined.
        `function showThis() {
        // In non-strict mode, 'this' is the global window object.
        // In strict mode, 'this' is undefined.
        console.log(this); 
        }

        showThis(); // window (in browser) or undefined (in strict mode)`
    


        `const counter = {
            count: 0,
            start: function() {
                // 'this' here is the 'counter' object
                setTimeout(function() {
                // But 'this' inside the callback is the 'window' object!
                // The function is called by setTimeout, not by 'counter'.
                console.log(this.count); // logs 'undefined' (or throws an error) because window.count doesn't exist.
                }, 1000);
            }
        };

        counter.start();`

        `const counter = {
        count: 0,
        start: function() {
            // 'this' here is the 'counter' object
            setTimeout(function() {
            // But 'this' inside the callback is the 'window' object!
            // The function is called by setTimeout, not by 'counter'.
            console.log(this.count); // logs 'undefined' (or throws an error) because window.count doesn't exist.
            }, 1000);
        }
        };

        counter.start();`

    **Explicit Binding** (.call(), .apply(), .bind())
        You can manually set the value of this using these methods.
        `      function sayHello() {
            console.log(`Hello, I'm ${this.name}.`);
            }

            const user = { name: 'John' };

        sayHello.call(user); // Output: Hello, I'm John.`

    **Arrow Functions**
        Arrow functions do not have their own this binding. Instead, they lexically inherit this from their parent scope. The value of this inside an arrow function is the same as the value of this outside of it. It's determined at the time of definition, not at the time of execution.

        `const counter = {
            count: 10,
            start: function() {
                // 'this' here is the 'counter' object
                setTimeout(() => {
                // The arrow function inherits 'this' from the 'start' method's scope.
                // So, 'this' is still the 'counter' object. It just works!
                console.log(this.count); 
                }, 1000);
            }
        };

        counter.start(); // Output: 10`

    **Object Methods**: If you define an object method with an arrow function, this will not refer to the object itself.

  `      const person = {
        name: 'Neha',
        greet: () => {
            // 'this' is inherited from the global scope, not 'person'
            console.log(`Hello, my name is ${this.name}.`); 
        }
        };

        person.greet(); // Output: Hello, my name is undefined.`

**What is call Apply and Bind**    
    **Call**
        `let obj1 = {
            name:"Neha",
            surname:"Dongre"
        }

        let obj12 = {
            name:"Monu",
            surname:"Chaurasia"
        }

        let temp = function(country, city){ // here this refers to current object
            console.log("here it goes", this.name, this.surname, country, city)
        }

        temp.call(obj1, "SG","khandwa")
        temp.apply(obj12,["Ind", "indore"])
        let tempFunc = temp.bind(obj1, "SG","khandwa");
        console.log("tempFunc=====", tempFunc)
        tempFunc();`

**Currying**  
    Currying is the process of transforming a function that expects multiple arguments into a sequence of functions that each take a single argument.
    **With Bind Method**
        `let multiply = function(x,y){
            console.log(x*y)
        }

        let mulBytwo = multiply.bind(this, 2, 6)

        mulBytwo(3) `

    **With clousures** 
        `let multiply = function(x){
            return function(y){
                console.log(x*y)
            } 
        } 

        let mulBytwo = multiply(2);
        mulBytwo(3)`

    **A Manually Curried Function**
        `function curriedMultiply(a) {
            // Returns a function that "remembers" `a` (this is a closure)
            return function(b) {
                // Returns a function that "remembers" both `a` and `b`
                return function(c) {
                // Now it has all arguments and can perform the calculation
                return a * b * c;
                }
            }
        }

        // You call it as a chain of functions
        const result = curriedMultiply(2)(3)(4);
        console.log("Curried function:", result); // Output: 24`


**Clousures**
 `   /**
    * This function creates an item manager. It doesn't return an object,
    * but an object of FUNCTIONS that have a "closed-over" scope.
    */
    function createItemManager() {
    // 1. The "Private" Data
    // This `items` array is inside the createItemManager scope.
    // It's in the "backpack" of the functions we return below.
    let items = [];

    console.log("Item manager created. The 'items' array is now private.");

    // 2. We return an object containing the public interface (the functions).
    return {
        /**
        * Adds an item to the private `items` array.
        * This function is a closure. It has access to the `items` array
        * from its parent scope.
        */
        addItem: function(item) {
        if (item) {
            items.push(item);
            console.log(`'${item}' added.`);
        }
        },

        /**
        * Returns a copy of the private `items` array.
        * This function is also a closure with access to `items`.
        * We return a copy (...) to prevent external modification of the original array.
        */
        getItems: function() {
        return [...items]; // Return a copy for extra security
        },
        
        /**
        * Returns the number of items. Also a closure.
        */
        getItemCount: function() {
        return items.length;
        }
    };
    }


    // --- Let's Use It ---

    // 1. Create a new manager. The `items` array is created and locked inside.
    const myManager = createItemManager();

    // 2. Interact with the manager using ONLY its public functions.
    myManager.addItem("Apples");      // Output: 'Apples' added.
    myManager.addItem("Bananas");     // Output: 'Bananas' added.

    // 3. Try to access the private data directly. You can't!
    console.log("Items=======", myManager.items);     // Output: undefined
    // The `items` array is not a property of the returned object.
    // It's hidden away inside the closure's "backpack". This is data privacy!

    // 4. Use the public functions to get the data.
    console.log("Current items:", myManager.getItems()); // Output: Current items: [ 'Apples', 'Bananas' ]
    console.log("Item count:", myManager.getItemCount());  // Output: Item count: 2


    // 5. Let's create another, completely separate manager.
    const yourManager = createItemManager();
    yourManager.addItem("Laptop");
    yourManager.addItem("Mouse");

    console.log("\nMy Manager's items:", myManager.getItems());    // Output: [ 'Apples', 'Bananas' ]
    console.log("Your Manager's items:", yourManager.getItems()); // Output: [ 'Laptop', 'Mouse' ]  `      
**Memoization**
Memoization in JavaScript is an optimization technique that significantly improves the performance of functions by caching the results of "expensive" function calls. When a memoized function is called with the same arguments again, instead of re-executing the entire computation, it returns the pre-computed result from its cache

**How Memoization Works**
    > The core idea behind memoization is to store the output of a function based on its input arguments.
    > First Call: When a memoized function is called for the first time with a particular set of arguments, it performs its regular computation.
    > Caching the Result: After computing the result, it stores this result in a cache (often an object or a Map). The arguments used for the call serve as the "key" to retrieve this stored result.
    > Subsequent Calls: If the same function is called again with the identical arguments, the function first checks its cache.
    > Returning Cached Result: If a result for those arguments is found in the cache, it's immediately returned without performing the computation again, saving time and resources. If not, the function computes the result, stores it, and then returns it.
    > This process is often implemented using closures in JavaScript, where the cache is maintained within the scope of the memoized function[2].
**Benefits of Memoization**
    > Performance Improvement: The primary benefit is speeding up applications by avoiding redundant computations, especially for functions that are computationally intensive or frequently called[1][2][5].
    > Reduced Recalculations: It prevents the same calculations from being performed over and over, leading to more efficient code[5].
    > Enhanced User Experience: Faster execution times can result in a more responsive and fluid user experience in web applications.
**Use Cases for Memoization**
    Memoization is particularly useful in situations where:
    > Functions have expensive computations: If a function involves heavy calculations, complex algorithms, or extensive data processing, memoization can save significant processing time by storing and reusing results[1][3].
    > Recursive Algorithms: Classic examples like the Fibonacci sequence or factorial calculations often involve repeated calculations for the same subproblems. Memoization can drastically improve their performance by caching intermediate results[1][2][5][9][10].
    > API Calls or Data Fetching: Caching responses from API calls or database queries with the same parameters can reduce network traffic and speed up data retrieval times[1].
    > Data Transformations: Caching the results of costly data transformations can be beneficial when the same transformations are applied repeatedly[7].
    > Frontend Frameworks (e.g., React): In frameworks like React, memoization (e.g., using React.memo, useCallback, useMemo hooks) can prevent unnecessary re-renders of components or re-execution of expensive functions as long as their inputs (props or dependencies) remain the same[2][7].

        `console.log("Hello, World!");
        function memoize(fn) {
        const cache = {}; // The cache to store results

        return function(...args) {
            // Create a unique key from the function arguments
            // JSON.stringify is a common way to handle various argument types
            console.log("arrrrrrrrrrrrrr==========", args)
            const key = JSON.stringify(args); 

            // If the result is already in the cache, return it
            if (cache[key]) {
            console.log('Fetching from cache for:', key);
            return cache[key];
            }

            // Otherwise, execute the original function
            console.log('Calculating result for:', key);
            const result = fn.apply(this, args); // Use apply to pass arguments as an array and preserve 'this'

            // Store the result in the cache before returning
            cache[key] = result;
            return result;
        };
        }

        // An example of an "expensive" function (e.g., calculating Fibonacci)
        function calculateFibonacci(n) {
        console.log("nnnnnnnnnnnnnnn==========", n)
        if (n <= 1) {
            return n;
        }
        return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
        }

        // Create a memoized version of the Fibonacci function
        const memoizedFibonacci = memoize(calculateFibonacci);

        console.log(memoizedFibonacci(10)); // Calculates and caches [1, 1]
        console.log(memoizedFibonacci(10)); // Fetches from cache [1, 1]
        console.log(memoizedFibonacci(15)); // Calculates and caches [1]
        console.log(memoizedFibonacci(10)); // Fetches from cache [1]    `
