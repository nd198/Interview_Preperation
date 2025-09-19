**Introduction to TypeScript**
    1) TypeScript is a superset of JavaScript, adding type safety and static checking.
    2) It's not a new language or a replacement for JavaScript, but a development tool that helps catch errors during coding rather than at runtime.
    3) All TypeScript code compiles to JavaScript, which runs in browsers or Node.js.
    4) Typscript is all about type saftey.
    5) typescript is development tool. it helps you to write better code with less problem with more scalable and maintablable code that is easily understandable and produces less error
    **Setting Up TypeScript**
        **Two ways to install:**
            > globally for practice (using npm install -g typescript), and as a dev dependency in a project.
            > Use the TSC (TypeScript compiler) command to transpile .ts files to .js.
    **Types**   
        1) number
        2) string
        3) boolean
        4) null, undefined, void
        5) Arrays and objects
        6) Special types: any, never, unknown  
    **Syntax**  
        `let VariableName : type = value;`
    **Note** : TypeScript can infer types when you immediately assign a value, so you don't always need explicit annotations.
    **Type Aliases**
    We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.
    A type alias is exactly that - a name for any type. The syntax for a type alias is:
    type ID = number | string;
    `type Point = {
        x: number;
        y: number;
    };
    
    // Exactly the same as the earlier example
    function printCoord(pt: Point) {
        console.log("The coordinate's x value is " + pt.x);
        console.log("The coordinate's y value is " + pt.y);
    }
    
    printCoord({ x: 100, y: 100 });` 

**Differences Between Type Aliases and Interfaces**:
    Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
    **Type :** 
    > No Declaration Merging: Type aliases cannot be declared multiple times; they must be unique within their scope.
    > No Class Implementation: Classes cannot implement a type alias directly.
    > More Versatile: Can describe not only object shapes but also primitives, union types, intersection types, tuples, and mapped types.
    > Extending/Intersection: Type aliases can be combined using intersection types (&).
    **interface:**
    An interface in TypeScript serves as a "syntactical contract" that defines the expected structure or "shape" of an object. It outlines the properties and method signatures an object should have, without providing any implementation details. Interfaces are a compile-time construct, primarily used for type-checking and enhancing code readability and maintainability.
    > Declaration Merging: Interfaces can be declared multiple times in the same scope, and TypeScript will merge them into a single interface. This is particularly useful for augmenting existing library types.
    > Implementation with Classes: Interfaces can be implemented by classes, ensuring that the class adheres to a specific structure.
    > Extending: Interfaces can extend other interfaces.
    > Primarily for Object Shapes: Historically, interfaces were the primary way to describe object shapes.
    **Key Characteristics:**
        > Define Object Shapes: They specify the names and types of properties and methods that an object must contain.
        > No Implementation: Interfaces cannot contain implementation logic for methods or properties; they only define signatures.
        > Optional Properties: You can mark properties as optional using a ? symbol.
        > Readonly Properties: Properties can be marked readonly to prevent modification after initial assignment.
        > Extensibility: Interfaces can extend other interfaces, allowing for reuse and the creation of more complex types.
        > Class Implementation: Classes can implement interfaces, ensuring they adhere to the defined contract.
        `interface User {
            id: number;
            name: string;
            email?: string; // Optional property
            readonly createdAt: Date; // Readonly property
            greet(message: string): void;
        }`
    **When to use which:**
    Use interface for: Defining the shape of objects that might be extended or implemented by classes, or when you need declaration merging.
    Use type for: Defining union types, intersection types, primitive aliases, tuples, or when you need the full power of type expressions.
**Extending an interface**
        `interface Animal {
            name: string;
        }

        interface Bear extends Animal {
            honey: boolean;
        }

        const bear = getBear();
        bear.name;
        bear.honey;`

**Extending a type via intersections**
        `type Animal = {
            name: string;
        }

        type Bear = Animal & { 
            honey: boolean;
        }

        const bear = getBear();
        bear.name;
        bear.honey; `

**Adding new fields to an existing interface**
        `interface Window {
            title: string;
        }

        interface Window {
            ts: TypeScriptAPI;
        }

        const src = 'const a = "Hello World"';
        window.ts.transpileModule(src, {}); ` 

**A type cannot be changed after being created**
        `type Window = {
            title: string;
        }

        type Window = {
            ts: TypeScriptAPI;
        }`

**What are "Type Guards" in TypeScript and why are they useful? Provide an example.**
Type Guards are mechanisms that allow you to narrow down the type of a variable within a conditional block. They are useful because they enable TypeScript's static analysis to understand that a variable, after passing a specific check, is of a more specific type. This allows you to safely access properties or methods that are only available on the narrowed type, preventing runtime errors.
**Common Type Guards:**
    > typeof Type Guard: Checks the primitive type of a variable ('string', 'number', 'boolean', 'symbol', 'undefined', 'object', 'function', 'bigint').
    > instanceof Type Guard: Checks if an object is an instance of a particular class.
    > in Operator Type Guard: Checks if a property exists on an object.
    > User-Defined Type Guards: Functions that return a type predicate (e.g., value is Type).
    > Truthiness Check: Simple checks for truthy/falsy values can sometimes act as type guards (e.g., if (value)).



**Touple:** 
    a tuple is a special type of array that has a fixed number of elements, and the type of each element is known and predefined.This allows you to store a collection of values of different types in a specific order.
    **Key Characteristics of Tuples:**   
        > Fixed Length and Types: The primary feature of a tuple is its predefined length and the specific type assigned to each index.[1]
        > Order Matters: The sequence of types in the definition is strictly enforced.[7][8] Swapping elements of different types will result in a compile-time error.
        > Type Safety: Tuples enhance type safety by ensuring that the right type of data is stored at the correct position. 
        `// A tuple with a string and a number
        let person: [string, number];

        // Initializing the tuple
        person = ["Alice", 30]; // This is valid

        // Invalid initializations:
        // person = [30, "Alice"]; // Error: Type 'number' is not assignable to type 'string'.
        // person = ["Alice", 30, true]; // Error: Tuple type '[string, number]' of length '2' has no element at index '2'. `   
    **Common Use Cases for Tuples**   
        1) Returning Multiple Values from a Function: Functions can use tuples to return a fixed set of different types.[2]
        `function getStatus(): [number, string] {
            return [200, "OK"];
        }
        const [statusCode, statusMessage] = getStatus();`     

        2) Representing Structured Data: Tuples are great for simple, structured data where creating a full class or interface might be overkill.
        `let user: [number, string, boolean] = [1, "JohnDoe", true]; // id, username, isActive`

        3) Key-Value Pairs: Storing simple key-value pairs.
        `let config: [string, string] = ["apiKey", "XYZ123"];`

**Enums:-**
    > an enum (short for enumeration) is a feature that allows you to define a set of named constants.Using enums can make your code more readable, less prone to errors, and easier to maintain by grouping related constant values.
    > A unique feature of numeric enums is reverse mapping, which allows you to get the name of a member from its numeric value.
    > TypeScript supports two main types of enums: Numeric and String.
    **1. Numeric Enums**
    In numeric enums, members are assigned number values. If you don't initialize them, the first member defaults to 0, and each subsequent member is auto-incremented by 1.
       1) `enum Direction {
            North, // 0
            East,  // 1
            South, // 2
            West   // 3
        }

        let dir: Direction = Direction.North;
        console.log(dir); // Outputs: 0`

        Initialized Behavior (starts at a specific number):
        You can set the starting value of the first member.
        2) enum StatusCodes {
            OK = 200,
            Created,     // 201
            Accepted,    // 202
            NotFound = 404
        }

        console.log(StatusCodes.Created); // Outputs: 201
        console.log(StatusCodes.NotFound); // Outputs: 404

        3) console.log(Direction[0]); // Outputs: "North"

    **2. String Enums**
    > String enums are often preferred for their readability.[5] In a string enum, each member must be explicitly initialized with a string value.[1] They don't have an auto-incrementing behavior. 
    > String enums are beneficial because they "serialize" well.[1] This means if you are debugging or logging, the string value ("ADMIN") is much more descriptive and meaningful than an opaque number like 0
       ` enum UserRole {
            Admin = "ADMIN",
            Editor = "EDITOR",
            Viewer = "VIEWER"
        }

        let role: UserRole = UserRole.Admin;
        console.log(role); // Outputs: "ADMIN"  ` 
    **Why Use Enums?**
        > Improved Readability and Maintainability: Enums replace "magic numbers" or strings with meaningful, named constants, making the code's intent clearer.[4]
        > Type Safety: TypeScript can check at compile-time that a variable is assigned one of the allowed enum values, preventing typos and invalid assignments.
        > Centralized Definition: By defining a set of related constants in one place, you avoid scattering raw values throughout your application. If a value needs to change, you only have to update it in the enum definition.
    **When to Use an Enum**
    You should use an enum when you have a small, fixed set of values that are known at compile time.[8][9] Good examples include:
        > Days of the week
        > Months of the year
        > Status codes (e.g., Pending, Success, Failed)
        > User roles (e.g., Admin, Member, Guest)
        > Configuration settings with a limited set of options

    **Enums vs. Union of String Literals** 
        An alternative to enums is using a union of string literals:
        `type UserAction = "CREATE" | "UPDATE" | "DELETE";
        let action: UserAction = "CREATE"; // Valid
        // let invalidAction: UserAction = "READ"; // Error: Type '"READ"' is not assignable to type 'UserAction'.
          `
        While this also provides type safety, enums can be better when you need to iterate over the set of values or when the values have a more complex relationship that benefits from being grouped in an enum object. String enums are often considered a good practice for readability. 
**TypeScript**
    > In TypeScript, an interface is a powerful feature for defining a "contract" or a "shape" that an object must adhere to. It's a way to describe the structure of an object, specifying the names of its properties and the types of values those properties should hold.
    >  Think of an interface as a blueprint for an object. It doesn't create an object itself, nor does it contain any implementation logic. It simply defines what an object should look like. This is a core concept in TypeScript that enables static type-checking and helps write more robust and predictable code. 
    **Key Purposes of Interfaces:**
        > Defining Object Shapes (Type Checking): This is the most common use case. An interface ensures that any object assigned to a certain type has the required properties and methods.
        > Creating Contracts for Classes: A class can implement an interface, which forces the class to provide implementations for all the properties and methods defined in the interface.
        > x`Function Type Definitions: Interfaces can also describe the shape of a function, including its parameters and return type.
    **1. Defining Object Shapes**
        `interface User {
            firstName: string;
            lastName: string;
            age: number;
        }

        function greet(user: User) {
        return `Hello, ${user.firstName} ${user.lastName}!`;
        }

        let myUser = {
            firstName: "John",
            lastName: "Doe",
            age: 30
        };
        console.log(greet(myUser)); // Works perfectly`
    **2. Defining Function Types**
    While less common for simple cases, interfaces can also define the structure of a function. 
        `interface MathOperation {
         (x: number, y: number): number;
        }

        let add: MathOperation = (a, b) => a + b;
        let subtract: MathOperation = (a, b) => a - b;

        console.log(add(5, 3));       // 8
        console.log(subtract(5, 3)); // 2 ` 
    **3. Implementing Interfaces in Classes**
    Interfaces are crucial for ensuring that a class adheres to a specific structure. A class uses the implements keyword to adopt an interface. 
        interface Drivable {
            start(): void;
            stop(): void;
            getSpeed(): number;
        }

        class Car implements Drivable {
            private speed = 0;

            start() {
                console.log("Engine started.");
                this.speed = 10;
            }

            stop() {
                console.log("Car stopped.");
                this.speed = 0;
            }

            getSpeed() {
                return this.speed;
            }
        }  

**Getters and Setters** 
    In TypeScript, getters and setters are special methods within a class that provide a way to control access to an object's properties.They allow you to "get" (read) and "set" (write) the value of a property, while adding extra logic, validation, or computation behind the scenes. This is a key feature for enforcing encapsulation and data integrity.
    **What are Getters?**
        A getter is a method that is used to retrieve the value of a property. It is defined using the get keyword. 
        Getters allow you to:
            > Provide controlled access to private properties: They can expose the value of a private property without allowing direct modification.
            > Compute derived properties: You can calculate a value based on other properties of the object.
        `get propertyName(): returnType { ... }`  
    **What are Setters?**
        A setter is a method that is used to set the value of a property. It is defined using the set keyword and must have exactly one parameter.
        Setters are useful for:
            > Validating data: You can check if a new value meets certain criteria before assigning it to a property.
            > Performing actions on property change: You can trigger other logic when a property's value is updated. 
            `set propertyName(value: type) { ... }`
            `class Person {
                private _name: string; 

                constructor(name: string) {
                    this._name = name;
                } 

                get name(): string {
                    return this._name;
                } 

                set name(newName: string) {
                    if (newName.length > 0) {
                        this._name = newName;
                    }
                } 
            }
            const person = new Person("Alice");
            console.log(person.name); // Accesses the getter 

            person.name = "Bob"; // Accesses the setter
            console.log(person.name);`
    **Benefits of Using Getters and Setters**
        > Encapsulation: They hide the internal implementation details of a class and provide a controlled interface for interacting with its properties.
        > Data Validation: Setters allow you to enforce rules and prevent invalid data from being assigned to properties.
        > Computed Properties: Getters can return values that are calculated on the fly, rather than being stored directly.
        > Improved Maintainability: By centralizing the logic for accessing and modifying properties, you make your code easier to read and maintain.

**Private, Public & Protected** 
    public, private, and protected are access modifiers that control the visibility and accessibility of class members (properties and methods).They are a fundamental concept of object-oriented programming that helps in encapsulating and organizing code.
    **1. public**
        The public access modifier is the default visibility for class members in TypeScript.[3] If you don't specify an access modifier, the member is considered public. Public members can be accessed from anywhere, without any restrictions.
            `class Animal {
                public name: string; 

                constructor(name: string) {
                    this.name = name;
                } 

                public move(distanceInMeters: number): void {
                    console.log(`${this.name} moved ${distanceInMeters}m.`);
                }
            } 
            const cat = new Animal("Cat");
            console.log(cat.name); // Accessible
            cat.move(10); // Accessible`

    **2. private**
        The private access modifier restricts the visibility of a class member to only within the class it is declared.Private members cannot be accessed from outside the class or from subclasses.   
            `class Person {
                private _age: number; 

                constructor(age: number) {
                    this._age = age;
                } 

                public getAge(): number {
                    return this._age;
                }
            } 

            const person = new Person(30);
            // console.log(person._age); // Error: Property '_age' is private and only accessible within class 'Person'.
            console.log(person.getAge()); // Accessible`

    **3. protected**
        The protected access modifier is similar to private, but it also allows access to the member in subclasses (derived classes).This is useful when you want to create a base class that other classes can extend, while still keeping some control over the class's internal state.
            `class Vehicle {
                    protected speed: number; 

                    constructor(speed: number) {
                        this.speed = speed;
                    }
            } 

            class Car extends Vehicle {
                public accelerate(): void {
                    this.speed += 10;
                }
            } 
            const car = new Car(50);
            // console.log(car.speed); // Error: Property 'speed' is protected and only accessible within class 'Vehicle' and its subclasses.  `   

**Abstract Class** 
    > In TypeScript, an abstract class serves as a blueprint for other classes.[1][2] It is a special type of class that cannot be instantiated on its own.Instead, it is designed to be extended by other classes (called subclasses or derived classes).
    > The primary purpose of an abstract class is to define a common structure and behavior that multiple related classes can share, promoting code reuse and enforcing a consistent contract. 
    Key Characteristics of Abstract Classes:
        1) Cannot be Instantiated: You cannot create a direct instance of an abstract class using the new keyword.Attempting to do so will result in a compile-time error.
            abstract class Animal {
                // ...
            }
            // const myAnimal = new Animal(); // Error: Cannot create an instance of an abstract class.  
        2) Can Contain Both Abstract and Concrete Methods: This is a key feature that distinguishes abstract classes from interfaces.
            > Abstract Methods: These are methods declared with the abstract keyword but without an implementation (no method body).Subclasses that extend the abstract class must provide an implementation for all its abstract methods.This enforces a contract that derived classes must follow.
            > Concrete Methods: These are regular methods with a full implementation.Subclasses inherit this functionality directly and can use it as-is, reducing code duplication.
        3) Can Have Properties and a Constructor: Abstract classes can have properties and a constructor.The constructor is used to initialize common properties that will be shared across all subclasses.     
**Generics**
    In TypeScript, generics are a powerful feature that allows you to create reusable components, functions, and data structures that can work with a variety of data types rather than a single one.They act as placeholders or "type variables" for types that will be specified when the code is used.
        > The primary goal of generics is to write flexible and reusable code while maintaining strict type safety, which helps in building robust and scalable applications.
        With generics, you can write the same function in a type-safe way:
        // The generic version
        `function identity<T>(arg: T): T {
        return arg;
        }

        // How to use it
        let output = identity<string>("myString"); // output is of type 'string'

        // Type inference also works
        let numOutput = identity(123); // TypeScript infers that T is 'number'`

        **Key Benefits of Using Generics**
        > Type Safety: Generics ensure that your code operates on various data types without sacrificing TypeScript's strict type checking. This helps catch errors at compile-time instead of runtime.[5]
        > Code Reusability: You can write a single function or component that works for multiple types, avoiding code duplication.
        > Flexibility: They allow for the creation of components that can adapt to different data types and changing requirements.
        **1. Generic Functions**
            function getFirstElement<T>(arr: T[]): T | undefined {
                return arr[0];
            }

            const numbers = [1, 2, 3];
            const firstNum = getFirstElement(numbers); // Inferred as number

            const strings = ["a", "b", "c"];
            const firstStr = getFirstElement(strings); // Inferred as string
        **2. Generic Classes**
            class Box<T> {
            private value: T;

            constructor(value: T) {
                this.value = value;
            }

            getValue(): T {
                return this.value;
            }
            }

            let numberBox = new Box<number>(42);
            console.log(numberBox.getValue()); // Output: 42

            let stringBox = new Box<string>("hello");
            console.log(stringBox.getValue()); // Output: "hello"

        **3. Generic Interfaces**
        Interfaces can also be generic to define the shape of objects that can work with various types.
            interface Pair<K, V> {
                key: K;
                value: V;
            }

            let myPair: Pair<string, number> = { key: "age", value: 30 };

       ** 4. Generic Constraints**
        Sometimes you want to limit the types that can be used with a generic. You can use constraints with the extends keyword to require that a type parameter has certain properties.
        interface WithLength {
            length: number;
        }

        function logLength<T extends WithLength>(arg: T): void {
        console.log(arg.length);
        }

        logLength("hello"); // Works because string has a 'length' property
        logLength([1, 2, 3]); // Works because array has a 'length' property
        // logLength(123); // Error: number does not have a 'length' property   
    
**Narrowing**
https://www.typescriptlang.org/docs/handbook/2/narrowing.html    
    
    

         


    readonly
    never
    void 
    optional ?
    array
    union type
    getters 
    setters
