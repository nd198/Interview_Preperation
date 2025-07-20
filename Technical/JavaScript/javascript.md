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