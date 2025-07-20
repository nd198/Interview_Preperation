# ES6 Features
**1. let and const for Variable Declarations**
    > This is one of the most fundamental changes. They are the new standard for declaring variables, replacing var.
    > **Problem with var**: Variables declared with var are function-scoped and hoisted. This means they are "lifted" to the top of their function, which can lead to unexpected behavior, especially in loops and conditional blocks.
    > **The Solution (let and const)**:
    let: Declares a block-scoped local variable. Its value can be changed. It is only accessible within the block ({...}) it's defined in.
    const: Declares a block-scoped "constant". Its value cannot be reassigned after it's declared. This is the preferred way to declare variables that won't change, which helps prevent accidental reassignments.
    `    // ES5 (with var)
        for (var i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i); // Prints "3" three times!
        }, 100);
        }

        // ES6 (with let)
        for (let i = 0; i < 3; i++) {
        setTimeout(function() {
            console.log(i); // Prints "0", "1", "2" correctly.
        }, 100);
        }
    `
    > **Why**? With var, there is only one i variable shared by all loop iterations. With let, a new i is created for each iteration of the loop.

**2. Arrow Functions (=>)**
    A more concise syntax for writing functions with a key difference in how this is handled.
    **Concise Syntax**: (params) => { statements } or param => expression for single-parameter, single-line functions.
    **Lexical this Binding**: This is the most important part. Arrow functions do not have their own this context. Instead, they inherit this from the parent scope where they were defined. This solves many common this-related bugs.

**3. Template Literals (Template Strings)**
    **Syntax**: Use backticks (`) instead of single or double quotes.
    **Features**:
        > String Interpolation: Easily embed variables and expressions directly into a string using ${expression}.
        > Multi-line Strings: Strings can span multiple lines without needing \n.

**4. Destructuring Assignment**
    A powerful syntax to extract data from arrays or objects into distinct variables.
    > Object Destructuring:
        `const person = { firstName: 'Neha', yearsOfExperience: 8 };
        const { firstName, yearsOfExperience } = person;
        console.log(firstName); // 'Neha'
        console.log(yearsOfExperience); // 8`
    > Array Destructuring:
        `const techStack = ['React', 'Node.js', 'MongoDB'];
        const [frontend, backend] = techStack;
        console.log(frontend); // 'React'
        console.log(backend); // 'Node.js' `  


**5. Rest and Spread Operators (...)**
**Spread Operator**: "Spreads" or expands an iterable (like an array) or object properties into     another array or object. It's great for making copies or merging.
        `// Spreading an array
        const arr1 = [1, 2, 3];
        const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

        // Spreading an object (for merging)
        const obj1 = { a: 1, b: 2 };
        const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }`

**Rest Operator**: Collects multiple elements or arguments into a single array. It's often used in function parameters.
        `function sum(...numbers) { // 'numbers' is an array of all arguments passed.
        return numbers.reduce((total, num) => total + num, 0);
        }
        console.log(sum(1, 2, 3, 4)); // 10`

**6. Default Parameters**
    Allows you to initialize function parameters with a default value if no value or undefined is passed.
    `// ES5
    function greet(name) {
    name = typeof name !== 'undefined' ? name : 'Guest';
    console.log('Hello, ' + name);
    }

    // ES6
    function greet(name = 'Guest') {
    console.log(`Hello, ${name}`);
    }

    greet(); // Hello, Guest
    greet('Neha'); // Hello, Neha`

**7. Classes (Syntactic Sugar)**
    Provides a cleaner, more familiar syntax for creating objects and dealing with inheritance. It's "syntactic sugar" over JavaScript's existing prototypal inheritance, not a new object-oriented model.

**8. Promises**
A native way to handle asynchronous operations. A Promise is an object that represents the eventual completion (or failure) of an async operation. It fixed the infamous "Callback Hell".

**9. Modules (import / export)**
    The official, standardized module system for JavaScript, allowing you to split your code into reusable files.
    export: Used to expose functions, objects, or variables from a module.
    import: Used to bring those exported members into another module.
        `export const PI = 3.14; //utils.js
        export default function add(a, b) {
            return a + b;
        }`

        `// Import the default export and a named export
        import add, { PI } from './utils.js';

        console.log(add(5, 5)); // 10
        console.log(PI); // 3.14`

            




