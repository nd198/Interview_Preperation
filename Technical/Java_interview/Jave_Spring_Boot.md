What is Dependencie injection

1) Project
2) GroupId - com.telusko
3) artifactId - demo
4) package - com.telusko.demo.web

**what is maven**
Both Maven and Gradle are build automation tools primarily used for Java projects, though they can be used for other languages as well. They help manage a project's build lifecycle, including:
> Dependency Management: Automatically downloading and managing external libraries (JARs) your project needs.
> Compilation: Compiling source code into bytecode.
> Testing: Running unit and integration tests.
> Packaging: Bundling compiled code and resources into distributable formats like JARs, WARs, or EARs.
> Deployment: (Optionally) deploying the packaged application to a server.
> Reporting: Generating project information and reports.

**Configuration**: Uses XML for its project configuration file, named pom.xml (Project Object Model).
**Philosophy**: "Convention over Configuration." Maven has a very well-defined lifecycle and standard project directory structure. If you follow these conventions, your pom.xml can be quite concise.
    **src/main/java**: For application source code
    **src/main/resources**: For application resources
    **src/test/java**: For test source code
    **src/test/resources**: For test resources
**Lifecycle**: Maven has fixed build lifecycles (e.g., default, clean, site). The default lifecycle includes phases like validate, compile, test, package, verify, install, deploy. When you run a phase, all preceding phases in that lifecycle are also executed.
**Dependency Management**: Declares dependencies in the pom.xml. Maven downloads them from repositories (like Maven Central) and manages transitive dependencies (dependencies of your dependencies).
Plugins: Functionality is extended through plugins. Many core tasks (like compiling, testing, packaging) are handled by default plugins.
**Maturity & Popularity**: Very mature, widely adopted, and has a vast ecosystem of plugins and community support.

**IOC**

**Dependencie injection** :- 
Dependency Injection (DI) is a software design pattern where an object or function receives other objects or functions (its dependencies) that it needs, rather than creating them internally.[1][2] This pattern aims to separate the concerns of constructing objects from using them, leading to more loosely coupled and maintainable programs.

**constructor Injection**
Dependencies are provided as parameters to the class's constructor. This is a very common and often preferred method
    1) Dependencies are provided as arguments to the class constructor.

    2) This approach is preferred for mandatory dependencies and for promoting immutability.

    3) Spring will call the constructor and supply the required dependencies.
    Example:
    `public class UserService {
        private final UserRepository userRepository;
        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
    }`


**Setter Injection**
The class provides public setter methods that an external entity (the "injector") uses to supply the dependencies after the object is created.
    1) Dependencies are provided through public setter methods after the bean is constructed.

    2) Useful for optional dependencies.

    3) Spring will call the setter method to inject the dependency.
    Example
    `public class UserService {
        private UserRepository userRepository;
        public void setUserRepository(UserRepository userRepository) {
            this.userRepository = userRepository;
        }
    }`


**Field injection**
    1) Dependencies are injected directly into fields, typically using the @Autowired annotation.
    2) While concise, field injection is generally discouraged for production code due to testability and immutability concerns
    Example:
    `@Component
    public class UserService {
        @Autowired
        private UserRepository userRepository;
    }`

**Method Injection**
Method Injection (or Interface Injection): Dependencies are passed as parameters to a specific method that requires them. This is useful when only certain methods need a particular dependency.
    1) Spring can override or implement methods to return a bean from the container, often used for prototype-scoped dependencies within singleton beans.
    2) This is an advanced technique and is less commonly used.

    Example
   ` public abstract class CommandManager {
        protected abstract Command createCommand();
    }`



**What is IOC**
> Inversion of Control (IoC) in Spring is a core principle where the control over the creation and lifecycle management of objects (called beans) is transferred from the application code to the Spring framework itself. Instead of objects creating or finding their dependencies directly, the Spring IoC container is responsible for assembling these objects and injecting their dependencies at runtime

**Key Concepts**

**IoC Container:** The central part of Spring’s IoC is the container, which manages the configuration, instantiation, assembly, and lifecycle of beans. The container uses configuration metadata (XML, annotations, or Java code) to know which objects to create and how to wire them together.

**Dependency Injection (DI):** IoC is most commonly implemented in Spring using Dependency Injection. With DI, dependencies are provided to objects by the container, rather than the objects creating or locating those dependencies themselves.

**Beans:** In Spring, a bean is any object that is managed by the IoC container. These are typically the backbone objects of your application.

**How IoC Works in Spring**
    > **Configuration**: The developer defines beans and their dependencies using XML, annotations, or Java configuration.
    > **Container Initialization**: Spring initializes the IoC container, reading the configuration metadata.
    > **Bean Creation and Dependency Injection**: The container creates beans and injects their required dependencies (via constructor, setter, or method injection).
    > **Lifecycle Management**: The container manages the complete lifecycle of beans, including initialization and destruction.

**Types of IoC Containers in Spring**  
    1) **BeanFactory** : The simplest IoC container, providing basic DI features.
    2) **ApplicationContext** : A more advanced container, extending BeanFactory with additional features like event propagation, internationalization, and integration with web applications. This is the most commonly used container in Spring applications

    `public class Car {
        private Engine engine;
        public Car(Engine engine) {
            this.engine = engine;
        }
        public void drive() {
            engine.start();
            System.out.println("Car is driving");
        }
    }`

**Explanation** : Instead of the Car class creating its own Engine, Spring’s IoC container creates both and injects the Engine into the Car when it is needed    

**Benefits of IoC in Spring**
    1) Loose Coupling: Objects do not need to know how to create or find their dependencies, making the code more modular and easier to maintain.

    2) Testability: Dependencies can be easily mocked or stubbed for testing.

    3) Maintainability and Modularity: Changes in one part of the system have minimal impact on others, and components can be reused more easily.

**Autowiring**    


**Controller Layer**
Client will call the controller, it's work to accepting the request and respond back to the client
spring creates the front layer which is known as fron controller and check all the request mapping and redirects as per that


**Service Layer**
write our buisness logic


**Repository Layer**
it will get the data from DB.


**Dependencies Insatalled**
> SpringFox Swagger UI
> SpringFox Swagger2