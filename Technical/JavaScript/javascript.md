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

