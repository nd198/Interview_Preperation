https://medium.com/@Pratik_Mane_9/solid-principles-the-superhero-framework-for-writing-unbreakable-react-code-9b7b60282c26
# SOLID Design Principle
The SOLID principles are a set of five design principles in object-oriented programming (OOP) that aim to make software designs more understandable, flexible, and maintainable. While initially conceived for OOP, their concepts are highly applicable to modern JavaScript development, especially in a Node.js environment where you often deal with modularity, maintainability, and scalability.

**1. Single-Responsibility Principle (SRP)**
**Definition**: A class (or module, function) should have only one reason to change. This means it should have only one primary responsibility.
- Everything should only have one reason to change

**Node.js Relevance:**

In Node.js, this translates to keeping your modules and functions focused on a single task.

**Ex.**
**Bad Example (Violates SRP):**
A single userController.js file that handles:
    > User authentication (hashing passwords, generating tokens)

    > User data validation

    > Database interactions (saving, retrieving users)

    > Sending email notifications

    > Generating PDF reports

If you need to change how emails are sent, you'd have to touch userController.js, which also contains authentication logic. This increases the risk of introducing bugs in unrelated parts of the code.

`class UserSetting{
    constructer(user){
        this.user = user;
    }

    changeSetting(){
        if(this.verifyCredentials()){

        }
    }

    verifyCredentials(){

    }
}`

**Good Example (Adheres to SRP):**
    > authService.js: Handles all authentication logic (hashing, token generation).

    > userService.js: Contains business logic related to users (e.g., creating a user, updating profile).

    > userRepository.js: Handles all database interactions for users.

    > emailService.js: Responsible for sending emails.

    > validationMiddleware.js: Handles input validation.

This separation makes your code much easier to understand, test, and maintain. If the email service changes, only emailService.js needs to be updated.


**2. Open/Closed Principle (OCP)**
**Definition**: Software entities (classes, modules, functions) should be open for extension, but closed for modification. This means you should be able to add new functionality without changing existing, working code.

**Node.js Relevance:**

This principle is crucial for building scalable and maintainable APIs and microservices.

**Bad Example (Violates OCP):**
An OrderProcessor function that uses a series of if/else if statements to handle different payment methods. If you add a new payment method, you have to modify the OrderProcessor function directly.

`function processOrder(order, paymentMethod) {
    if (paymentMethod === 'creditCard') {
        // ... credit card logic
    } else if (paymentMethod === 'paypal') {
        // ... paypal logic
    } else if (paymentMethod === 'bankTransfer') {
        // ... bank transfer logic
    }
    // What if a new method like 'stripe' comes? You modify this function.
}`

**Good Example (Adheres to OCP):**
Using a strategy pattern or dependency injection. Define an interface (or a common contract/shape) for payment methods, and then inject the specific payment handler.
`    // paymentStrategies/creditCardPayment.js
    class CreditCardPayment {
        process(amount) { /* ... credit card processing ... */ }
    }

    // paymentStrategies/paypalPayment.js
    class PaypalPayment {
        process(amount) { /* ... paypal processing ... */ }
    }

    // paymentFactory.js (to choose the right strategy)
    const paymentStrategies = {
        creditCard: new CreditCardPayment(),
        paypal: new PaypalPayment(),
        // Add new strategies here without changing OrderProcessor
    };

    function getPaymentStrategy(method) {
        if (!paymentStrategies[method]) {
            throw new Error('Invalid payment method');
        }
        return paymentStrategies[method];
    }

    // orderProcessor.js (closed for modification)
    function processOrder(order, paymentMethodType) {
        const paymentStrategy = getPaymentStrategy(paymentMethodType);
        paymentStrategy.process(order.totalAmount);
        // ... rest of order processing
    }
`

Now, to add a new payment method (e.g., Stripe), you just create a new StripePayment class and register it in the paymentStrategies object. processOrder remains unchanged.

**3. Liskov Substitution Principle (LSP)**
**Definition**: Objects of a superclass should be replaceable with objects of a subclass without breaking the application. In simpler terms, if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering the correctness of the program.

**Node.js Relevance:**

This principle often comes into play when dealing with polymorphism, class inheritance (though less common in Node.js than composition), or adhering to interfaces (implicit in JavaScript).

**Bad Example (Violates LSP):**
`class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);`

**Good Example (Adheres to LSP):**

  `  class Shape {
    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }
    }

    class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
    }

    class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }

    getArea() {
        return this.length * this.length;
    }
    }

    function renderLargeShapes(shapes) {
    shapes.forEach((shape) => {
        const area = shape.getArea();
        shape.render(area);
    });
    }

    const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
    renderLargeShapes(shapes);`


**4. Interface Segregation Principle (ISP)**
**Definition**: Clients should not be forced to depend on interfaces they do not use. This means large interfaces should be split into smaller, more specific ones so that clients only need to know about the methods that are relevant to them.

**Node.js Relevance:**
While JavaScript doesn't have explicit interfaces like Java or C#, this principle still applies conceptually to how you design your module exports and function arguments.

**Bad Example (Violates ISP)**
Here, we have a single AdminManager that handles everything: creating users, deleting users, creating products, and deleting products.

check AdminManager.js file

Now, let's see how a "User Client" would use this:

Check userClient.js

**Why it Violates ISP:**

The UserClient only needs to interact with createUser and deleteUser. However, it is forced to depend on the entire AdminManager interface, which also includes createProduct, deleteProduct, and potentially other methods it doesn't care about.

Unnecessary Dependency: The UserClient has a dependency on methods it doesn't use.

Increased Coupling: Changes to product management methods in AdminManager (e.g., changing their signatures) could potentially force a re-evaluation or even recompilation of UserClient (if this were a compiled language), even though UserClient doesn't use those methods. In JavaScript, it primarily increases conceptual coupling and test complexity.

Reduced Testability: When testing UserClient, you implicitly depend on the AdminManager and all its capabilities, even if you only need the user-related ones. Mocking becomes more complex.

**Good Example (Adheres to ISP)**
Now, let's refactor this to adhere to ISP. We'll split AdminManager into two more specific managers: UserManager and ProductManager.

1. src/good_isp_example/userManager.js (Specific User Interface)

2. src/good_isp_example/productManager.js (Specific Product Interface)

Now, the UserClient only needs to depend on the UserManager:

**    // src/good_isp_example/userClient.js (Client depending on "segregated" interface)

    const UserManager = require('./userManager'); // Only imports the user-specific manager

    class UserClient {
        constructor() {
            this.userManager = new UserManager(); // This client depends ONLY on UserManager
            console.log("UserClient: Initialized and connected to UserManager (no product methods).");
        }

        registerNewUser(userData) {
            console.log("\nUserClient: Registering a new user...");
            this.userManager.createUser(userData);
        }

        removeOldUser(userId) {
            console.log("UserClient: Removing an old user...");
            this.userManager.deleteUser(userId);
        }

        // This client does NOT have access to product methods via this.userManager
        // console.log(this.userManager.createProduct); // This method DOES NOT EXIST here, as expected!
    }

    module.exports = UserClient;**


**Why the "Good Example" Adheres to ISP:**
    **Segregated Interfaces:** Instead of one large AdminManager, we now have UserManager and ProductManager, each with a focused set of responsibilities and methods.
    **Clients Depend Only on What They Need:**
        > UserClient only imports and depends on UserManager. It is completely unaware of product management methods.
        > ProductClient (if you had one) would only import and depend on ProductManager.
    **Reduced Coupling:** If the ProductManager's internal implementation changes (e.g., how it stores product data), the UserClient is completely unaffected, as it has no dependency on ProductManager.
    **Improved Testability:** You can now test UserManager and ProductManager independently, and when testing UserClient, you only need to mock UserManager's methods, not the entire AdminManager behemoth.


**5.Dependency Inversion Principle (DIP)** 
    **Definition:**
        > High-level modules should not depend on low-level modules. Both should depend on abstractions.
        > Abstractions should not depend on details. Details should depend on abstractions.
    **Node.js Relevance:**
    This is extremely important in Node.js for testability, flexibility, and managing dependencies, especially when dealing with external services (databases, APIs, logging). It encourages loose coupling.
    **Bad Example (Violates DIP):**
        A UserService directly instantiates and uses a specific MongoDBClient or PostgreSQLClient directly.
`        // userService.js
        const MongoClient = require('mongodb').MongoClient; // Direct dependency on a concrete implementation
        class UserService {
            constructor() {
                this.dbClient = new MongoClient('mongodb://localhost:27017'); // Creates the concrete dependency internally
            }
            async createUser(userData) {
                await this.dbClient.connect();
                const collection = this.dbClient.db('mydb').collection('users');
                await collection.insertOne(userData);
                await this.dbClient.close();
                return 'User created';
            }
        }`
        To test createUser, you need a running MongoDB instance. Swapping to PostgreSQL would require changing UserService directly.
    **Good Example (Adheres to DIP):**
        High-level modules (like UserService) depend on an abstraction (e.g., an IUserRepository interface or a factory function for a generic UserRepository). The concrete implementation (MongoDBUserRepository) then depends on this same abstraction. This is often achieved through Dependency Injection.  
`        // src/interfaces/IUserRepository.js (Abstraction - conceptually, not a real interface in JS)
        // Defines the contract that any user repository should adhere to
        class IUserRepository {
            async create(userData) { throw new Error('Method not implemented'); }
            async findById(id) { throw new Error('Method not implemented'); }
            // ... other methods
        }

        // src/repositories/mongoUserRepository.js (Low-level detail, depends on abstraction)
        class MongoUserRepository extends IUserRepository {
            constructor(mongoDbInstance) {
                super();
                this.db = mongoDbInstance;
                this.collection = this.db.collection('users');
            }
            async create(userData) {
                const result = await this.collection.insertOne(userData);
                return result.ops[0];
            }
            async findById(id) {
                return await this.collection.findOne({ _id: new ObjectId(id) });
            }
        }

        // src/services/userService.js (High-level module, depends on abstraction)
        class UserService {
            // Depends on the abstraction (IUserRepository)
            constructor(userRepository) {
                this.userRepository = userRepository;
            }

            async registerUser(userData) {
                // ... validation, business logic
                return await this.userRepository.create(userData);
            }
        }

        // src/app.js (Composition Root / Where dependencies are wired up)
        const { MongoClient, ObjectId } = require('mongodb');
        const { UserService } = require('./services/userService');
        const { MongoUserRepository } = require('./repositories/mongoUserRepository');

        async function startApp() {
            const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
            const db = client.db('mydb');

            // Wiring up: inject concrete implementation into the high-level service
            const mongoUserRepository = new MongoUserRepository(db);
            const userService = new UserService(mongoUserRepository);

            // Now userService can be used
            // const newUser = await userService.registerUser({ name: 'Jane Doe', email: 'jane@example.com' });
            // console.log('New user created:', newUser);
        }

        startApp();  `

    Now, UserService doesn't care if it's talking to MongoDB, PostgreSQL, or an in-memory database during testing. It only knows about the create and findById methods that userRepository provides. This makes UserService easy to test in isolation by injecting a mock repository.

    **Conclusion**
    Applying SOLID principles in Node.js leads to:

        > More Maintainable Code: Changes are localized, reducing the risk of unintended side effects.

        > Easier Testing: Components are isolated and their dependencies can be mocked.

        > Greater Flexibility: Adapting to new requirements or technologies (e.g., swapping databases, adding new features) becomes much smoother.

        > Improved Collaboration: Teams can work on different modules without constantly stepping on each other's toes.

