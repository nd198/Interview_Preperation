# Inversion of Control(IOC)
In Spring, IoC (Inversion of Control) is a fundamental design principle that is at the core of the framework. It refers to the practice of transferring the control of object creation, configuration, and lifecycle management from your application code to an external entity, which in Spring is the Spring IoC Container.

> **Traditional Programming (Without IoC)**: Your objects are responsible for creating or obtaining their own dependencies. If a Car object needs an Engine object, the Car itself would likely create an instance of Engine (e.g., Engine engine = new Engine();). The Car controls the creation and acquisition of its Engine.

> **Inversion of Control (With IoC, as in Spring)**: Your objects (called "beans" in Spring terminology) don't create their dependencies. Instead, they declare what they need (their dependencies), and an external container (the Spring IoC Container) is responsible for:
    1) Creating the objects (beans).
    2) Wiring the dependencies between these beans.
    3) Managing the complete lifecycle of these beans (from creation to destruction).

**Note**: The "Inversion" is that the control over object creation and dependency management is inverted – it moves from your application code to the Spring framework/container. You don't call a constructor for a dependency; the container provides it to you.
How Spri    

**How Spring Implements IoC:**
Spring implements IoC primarily through Dependency Injection (DI). DI is a specific pattern or technique to achieve IoC.

    1) The Spring IoC Container (e.g., ApplicationContext or BeanFactory):
        > This is the heart of the Spring Framework.
        > It reads configuration metadata (which tells the container what objects to instantiate,      configure, and assemble). This metadata can be provided via:
            > XML configuration files (older style)

            > Java Annotations (modern, preferred style - e.g., @Component, @Service, @Repository, @Controller, @Autowired, @Bean)
            
            Java Code (Java-based configuration - e.g., @Configuration classes)
        > Based on this metadata, the container constructs the objects (beans).

    2) Beans:
    These are simply Java objects whose lifecycle and dependencies are managed by the Spring IoC 
    container.

    3) Dependency Injection (DI): already have notes


# Why is IoC (and DI) Beneficial in Spring?

    > Decoupling: Components are less coupled because they don't create their dependencies directly. They only know about the interfaces of their dependencies, and the container provides the concrete implementations. This makes your code more modular.

    > Easier Testing: When dependencies are injected, it's much easier to substitute them with mock objects or stubs during unit testing. You can simply inject a mock Engine into your Car for testing purposes.

    > Improved Reusability: Loosely coupled components are often more reusable in different parts of the application or even in other applications.

    > Centralized Configuration: The way objects are created and wired together is defined in a central place (configuration metadata), making the system easier to understand and manage.

    > Reduced Boilerplate Code: You write less code for creating and connecting objects.

    > Lifecycle Management: Spring can manage bean scopes (e.g., singleton, prototype) and call lifecycle callback methods (e.g., methods annotated with @PostConstruct for initialization or @PreDestroy for cleanup).

In essence, IoC in Spring lets developers focus on writing the business logic of their application components (beans), while the Spring container takes care of the "plumbing" – creating, configuring, and managing these components and their interdependencies.

# What is bean lifecycle

