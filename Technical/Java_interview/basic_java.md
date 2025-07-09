**JAVA Setup**
1) install the jdk which is compiler
   https://www.oracle.com/sg/java/technologies/downloads/#jdk21-windows

2) java to run the application
3) javac to compile the application

JAVA Defination
Java is object orieneted(everything should be object and we create the Object with the help of class)
Java is platform independent(we can run our application on any machine)
> Java code get converted into byte code with the help of compiler and JVM execute that code
> JVM is not platform independent
> JVM(Java virtual machine) is part of JRE(JAVA runtime enironment)
> JVM executes the JAVA code.
> JVM is part of JRE.
> whenever we install the JDK we will get the JRE and JVM 
> JAVA is strongly typed language
> println will for new line
> inbuilt datatype
    int, byte, short, long(we need to specify l  after the number), float(we need to specify f after the number), double, char, boolean

JAVA Code --> Compiler(Javac) --> Byte Code --> JVM(which execute the code)
and JVM will look for the main file(entry point) to execute 

what is casting and conversion in java

**Method overloading**
Method overloading in Java is a feature that allows a class to have more than one method with the same name, as long as their parameter lists are different.This means the methods must differ in the number of parameters, the types of parameters, or the sequence (order) of parameters.Method overloading is a way to achieve compile-time polymorphism (also known as static polymorphism or early binding) because the decision of which method to call is made by the compiler at the time of compilation based on the arguments passed.

**Stack** :- Last in First out
it stores the local variables 

**Heap** :- 
stores the instance variables
there is link between stack and heap

**Strings**:- 
**Mutable Strings** : somethong which can be changed
**Immutable Strings** : something which can not be changed(by defualt string are immutable).
    1) Stringbuffer
    2) StringBuilder

**Static variables:** means we are making something as class memeber not the object memeber;
**Static Method**: we can call static method directly with the help of the class name
 we can not call non static variables inside the static method, but we can directly use static variables

**Note** :  Class.forName("Mobile") it will load the class and static variables as well

> **we can create the instance variable private but that can be access by the method of the same class**

**constructor**
> it will have the same name as the class
> it will not return any thing so no need to pass the data type like int or etc
> whenever we create the object of the class , it will called automatically
> every constructor in java has the method name Super(), weither we defined or not
> every constructor first execute the super() method and it states that call the constructor of the     super class

**Note** Every class in JAVA will extends the object class.
> this() will execute the current class constructor

**Naming Conventions**
Class -  first letter should be capital(ex. Demo)
variables and methods - in small letter (ex method(), temp)
constant - should be in upper case(ex. BRAND)

**Anonymous Object**
> which don't have the name.
> we can not use this 

**Inheritance**
> Single level inheritance
> multi level inheritance
>**Note**: In JAVA multiple inheritance will never work(when child class inherit the properties from 2 parent class)

**Method Overidding**
Method overriding in Java occurs when a subclass provides a specific implementation for a method that is already defined in its superclass. The overriding method in the subclass must have the same name, parameters, and return type as the method in the superclass. It allows a subclass to modify or extend the behavior of an inherited method. 

**Packages**
Packages in Java serve as containers for grouping related classes, interfaces, and sub-packages, similar to folders in a file system. They provide a mechanism for organizing and managing code, preventing naming conflicts, and controlling access to classes. Packages help in creating modular and maintainable code, especially in large projects.

*Packages are declared using the package keyword at the beginning of a Java source file. For example:*
package com.example.myproject;

`public class MyClass {
    // Class implementation
}`

**Access Modifier**
                                public   private   defualt   protected

same class                        yes       yes      yes        yes

same package subclass             yes       No      yes        yes

same package non sub class        yes       No      yes        yes

different package subclass        yes       No      No        yes  

Different package non subclass    yes       No      No        No


**Polymorphism**(RunTimePolyMethodOverriding file):- Polymorphism, a core concept in object-oriented programming (OOP), means "many forms." In Java, it allows objects to behave differently based on their specific class type or the context in which they are used. Essentially, it enables you to perform a single action in different ways.

**There are two types of polymorphism**
1) **Compile time** :- 
> if the behaviour id defined at compile time.
> overloading is part of compile time.
2) **Runtime** :- 
> if the behaviour id defined at run time.
> overriding is part of runtime.

**Final Keyword**:-
> it can be used with variable, method or class.
> we can not reassing the value if we have made any variable final
 ex.  `final int num = 8;`
> if we are using final with class so no one can extends or inherrit that class.
> if we use final with method so no one can overrid the method in child or different class


**Object Class**
// need to check one more time Object Class equals toString hashcode
every class in java inherits the object class

**Typecasting**
when we are conerting the value
`double d = 4.5;
int i = (int) d; // Typecasting`

**Upcasting**: example is in UpcastingDowncasting.java

**Downcasting** : example is in UpcastingDowncasting.java

**Abstract Keyword**:-
> class can have Abstract method
> we can have multiple Abstract method in sam class.
> it's compulasry to defined all the methods in child class.
> **Cannot be Instantiated:** You cannot create an object (instance) of an abstract class directly using the new keyword. The primary purpose of an abstract class is to be subclassed (extended).

// Abstract class
abstract class Shape {
    // ...
}

// Shape myShape = new Shape(); // This would cause a compile-time error

>**Can Have Constructors**: Abstract classes can have constructors. These constructors are typically called when an object of a concrete subclass is created (using super() from the subclass constructor). While you can't instantiate an abstract class directly, its constructor is still important for initializing any fields it might have.

>**Can Have Fields (Instance Variables)**: Abstract classes can have instance variables, including final ones.

2. **Abstract Methods**
An abstract method is a method that is declared with the abstract keyword and does not have an implementation (no method body, just a semicolon at the end of the signature).
`public abstract void draw();` // Notice the semicolon, no curly braces {}

**Must be in an Abstract Class**: If a class contains one or more abstract methods, the class itself must be declared abstract. (The reverse is not true; an abstract class doesn't necessarily need to have abstract methods).

**Must be Implemented by Concrete Subclasses:** Any concrete (non-abstract) class that extends an abstract class must provide an implementation (override) for all inherited abstract methods. If a subclass does not implement all inherited abstract methods, then that subclass must also be declared abstract.

**Cannot be final or static:**
final methods cannot be overridden, but abstract methods must be overridden. This creates a contradiction.
static methods belong to the class, not an instance, and are not overridden in the typical polymorphic way. Abstract methods are inherently designed for instance-level overriding.

**Cannot be private**: Private methods are not visible to subclasses and therefore cannot be overridden. Abstract methods need to be visible to be implemented by subclasses.


**Why Use abstract?**
> **Achieve Abstraction:** Hides unnecessary details and shows only the essential parts. For instance, in the Animal example, you know all animals make a sound, but the Animal class doesn't know what sound each specific animal makes. That detail is left to the subclasses.

**Define a Template/Contract**: Ensures that subclasses provide specific implementations for certain behaviors.

**Promote Polymorphism**: Allows you to treat objects of different subclasses (like Dog and Cat) through their common abstract superclass type (Animal), and the correct makeSound() implementation will be called at runtime.

**Reduce Code Duplication**: By placing common methods and fields in the abstract superclass.

`abstract class Animal {
    private String name;

    // Constructor
    public Animal(String name) {
        this.name = name;
    }

    // Concrete method
    public String getName() {
        return name;
    }

    // Abstract method (no body, must be implemented by subclasses)
    public abstract void makeSound();

    // Another concrete method
    public void sleep() {
        System.out.println(name + " is sleeping.");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name); // Calls the Animal constructor
    }

    @Override
    public void makeSound() { // Implementation of the abstract method
        System.out.println(getName() + " says: Woof woof");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    @Override
    public void makeSound() { // Implementation of the abstract method
        System.out.println(getName() + " says: Meow");
    }
}

public class TestAbstract {
    public static void main(String[] args) {
        // Animal myAnimal = new Animal("Generic"); // Compile-time error: Animal is abstract

        Animal myDog = new Dog("Buddy");
        Animal myCat = new Cat("Whiskers");

        myDog.makeSound(); // Output: Buddy says: Woof woof
        myDog.sleep();     // Output: Buddy is sleeping.

        myCat.makeSound(); // Output: Whiskers says: Meow
        myCat.sleep();     // Output: Whiskers is sleeping.
    }
}`

**Inner Class:**:- Description in InnerClass file
**Note**:- we cannot make outer class static, static can be used for inner class.

**Anonymous Inner class** :
An anonymous inner class in Java is an inner class that doesn't have a name.It's declared and instantiated in a single expression at the point of use.This means you define the class and create an object of it at the same time.Anonymous inner classes are useful when you need to create a one-off object with a specific, often simple, implementation of a class or an interface, without the need to create a separate, named .java file for it.

**When to Use Anonymous Inner Classes:**
**Conciseness for One-Time Use:** They are ideal when you need a small, single-use class, for example, as an event listener or a callback.This makes the code more concise by avoiding the need for a separate named class file.

**Event Handling (GUIs):** Very common in GUI programming (like AWT or Swing/JavaFX) for creating event handlers (e.g., ActionListener, MouseListener).

**Implementing Interfaces with a Single Method (before Lambdas):** Before Java 8 introduced lambda expressions, anonymous inner classes were the standard way to provide a quick implementation for interfaces like Runnable or Comparator.

**Overriding Methods of a Class for a Specific Instance:** Useful when you want an instance of an object with slightly modified behavior from its superclass, but only for that specific instance.

**What is Interface**
> don't have the meomry in the heap
> In Java, an interface is a reference type that acts as a contract or a blueprint for classes.[1][2] It defines a set of methods that a class can implement.[1][3] Essentially, an interface specifies what a class should do, but not how it should do it (with some exceptions for default and static methods).

**1. Purpose of Interfaces:**

**Achieving Abstraction**: Interfaces provide a way to achieve total abstraction.[1][4] They define a set of behaviors without specifying the implementation.

**Defining a Contract**: They establish a contract for classes.[3] If a class implements an interface, it guarantees that it will provide implementations for the methods defined by that interface (unless the class itself is abstract).

**Multiple Inheritance of Type**: Java classes do not support multiple inheritance of state (i.e., a class cannot extend more than one class). However, a class can implement multiple interfaces. This allows an object to have multiple types and exhibit behaviors from different interfaces.

**Loose Coupling**: Interfaces promote loose coupling between components. Classes depend on the behavior defined by the interface, not on the specific implementation of other classes.[1] This makes systems more modular and easier to maintain.

**Polymorphism**: Interfaces are a key enabler of polymorphism, where objects of different classes that implement the same interface can be treated uniformly through the interface type.[2]

**2. What Can an Interface Contain?**
**Abstract Methods**: These are methods declared without a body (no implementation). By default, all methods in an interface are public and abstract (you don't need to explicitly write these keywords, though it's good practice for clarity).The implementing class must provide the concrete implementation for these methods.

**Constants (Static Final Variables)**: Variables declared in an interface are implicitly public, static, and final (constants).Their values cannot be changed.

**Default Methods** (Java 8 and later): These are methods in an interface that have a default implementation.If a class implements an interface but does not provide an implementation for a default method, the default implementation from the interface is used. This allows adding new methods to existing interfaces without breaking implementing classes.

**Static Methods (Java 8 and later)**: Interfaces can also have static methods with implementations.
These methods are called on the interface itself (e.g., InterfaceName.staticMethod()) and are not inherited by implementing classes in the same way instance methods are.

**Private Methods (Java 9 and later)**: Interfaces can have private and private static methods.These are helper methods that can be used by default and static methods within the same interface to share common code and improve encapsulation, but they are not accessible outside the interface.

**Nested Types**: Interfaces can contain nested interfaces and classes.

3. **What Can an Interface NOT Contain (Traditionally)?**
**Constructors**: Interfaces cannot have constructors because they cannot be instantiated directly (you can't create an object of an interface type using new InterfaceName()).[5][6]

**Instance Fields (Non-final variables)**: Traditionally, interfaces could not have instance variables. All variables are implicitly public static final.[5]

**Concrete Method Implementations (before Java 8)**: Prior to Java 8, all methods in an interface were purely abstract.[4]


4. **How Are Interfaces Used?**
**implements Keyword**: A class uses the implements keyword to indicate that it is providing concrete implementations for the methods defined in one or more interfaces.[1][6]

`public class MyClass implements MyInterface1, MyInterface2 {
    // Implementation of methods from MyInterface1
    // Implementation of methods from MyInterface2
}`

**extends Keyword (for interfaces)**: An interface can extend one or more other interfaces using the extends keyword.[5][15] This creates an interface hierarchy where the child interface inherits all the methods and constants from its parent interfaces.

// Define an interface
`interface Drawable {
    int RED = 1; // Constant (public static final by default)
    void draw(); // Abstract method (public abstract by default)

    default void getDetails() { // Default method (Java 8+)
        System.out.println("Drawing details...");
    }

    static void staticInfo() { // Static method (Java 8+)
        System.out.println("This is a drawable entity.");
    }
}

// Class implementing the interface
class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle with color code: " + RED);
    }

    // Optionally override the default method
    @Override
    public void getDetails() {
        System.out.println("Circle specific details.");
    }
}

class Rectangle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle.");
    }
}

public class TestInterface {
    public static void main(String[] args) {
        Drawable circle = new Circle();
        Drawable rectangle = new Rectangle();

        circle.draw();          // Output: Drawing a circle with color code: 1
        circle.getDetails();    // Output: Circle specific details.

        rectangle.draw();       // Output: Drawing a rectangle.
        rectangle.getDetails(); // Output: Drawing details... (uses default implementation)

        Drawable.staticInfo();  // Output: This is a drawable entity.
    }
}`

> In summary, interfaces are a powerful feature in Java that enforce a contract for classes, enable abstraction and polymorphism, and provide a mechanism for achieving multiple inheritance of type. They are crucial for building flexible and maintainable object-oriented systems.

**Need of interface: I need to check te vide again**


**Enum**
In Java, an enum (enumeration) is a special data type that enables a variable to be a set of predefined constants. The variable must be equal to one of the values that have been predefined for it. Enums are used when you know all possible values of a variable at compile time or design time, such as choices on a menu, days of the week, states in a state machine, etc.

Before enums were introduced in Java 5, the common way to represent a fixed set of constants was using public static final int variables. However, this approach had several drawbacks:

**Not Type-Safe**: You could assign any integer value to a variable intended to hold one of these constants, leading to potential errors.

**No Namespace**: Constants from different sets could clash if they had the same integer value.

**Readability**: Printing the integer value wasn't as informative as printing a meaningful name.

**Iteration**: It wasn't straightforward to iterate over all possible constant values.

Enums solve these problems and provide a more robust and object-oriented way to handle fixed sets of constants.

**Key Characteristics and Features of Java Enums:**

**Type Safety**: Enums provide compile-time type safety. You cannot assign an arbitrary value to an enum variable; it must be one of the defined enum constants.

`enum Level { LOW, MEDIUM, HIGH }
Level myLevel = Level.MEDIUM;
// myLevel = 1; // Compile-time error`


**Implicitly static and final**: Each enum constant is implicitly public, static, and final. You access them using the enum name (e.g., Level.LOW).

**Instance of Enum Type**: Each enum constant is an instance of the enum type itself. For example, Level.LOW is an object of type Level.

**Can Have Constructors, Fields, and Methods**: This is a powerful feature. Enums can have:

**Constructors**: Enum constructors must be private or package-private. They are called automatically when the enum constants are initialized (once for each constant).

**Instance Fields**: Each enum constant can have its own values for instance fields.

**Methods**: Enums can have instance methods that can operate on the fields of the enum constant.

Can implement interfaces.

**Cannot be Extended**: You cannot create a subclass of an enum (enum types cannot be extended by other classes).

**Inherits java.lang.Enum**: All enums implicitly extend the java.lang.Enum class, which provides several useful methods:

    > values(): Returns an array containing all the enum constants in the order they are declared.

    > valueOf(String name): Returns the enum constant with the specified name. Throws IllegalArgumentException if no constant with that name exists.

    > ordinal(): Returns the ordinal (its position in its enum declaration, where the initial constant is assigned an ordinal of zero).

    > name(): Returns the name of this enum constant, exactly as declared in its enum declaration. (Often the same as toString(), but toString() can be overridden).

    > compareTo(): Compares this enum with the specified object for order.

**Usable in switch Statements**: Enums work very well with switch statements, making the code cleaner and more readable.

Basic Syntax:

`public enum EnumName {
    CONSTANT1,
    CONSTANT2,
    CONSTANT3
    // ... more constants
}`

IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Java
IGNORE_WHEN_COPYING_END

Example 1: Simple Enum

`public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
}

public class EnumTest {
    public static void main(String[] args) {
        Day today = Day.WEDNESDAY;

        System.out.println("Today is: " + today); // Output: Today is: WEDNESDAY
        System.out.println("Ordinal of today: " + today.ordinal()); // Output: Ordinal of today: 3

        switch (today) {
            case MONDAY:
                System.out.println("Start of the work week.");
                break;
            case FRIDAY:
                System.out.println("Almost weekend!");
                break;
            default:
                System.out.println("Mid-week or weekend.");
                break;
        }

        System.out.println("\nAll days of the week:");
        for (Day d : Day.values()) {
            System.out.println(d);
        }
    }
}`


**Example 2: Enum with Fields, Constructor, and Methods**
`public enum TrafficLight {
    RED("Stop", 60),      // Calls constructor TrafficLight("Stop", 60)
    YELLOW("Caution", 5), // Calls constructor TrafficLight("Caution", 5)
    GREEN("Go", 60);      // Calls constructor TrafficLight("Go", 60)

    private final String action; // Instance field
    private final int durationSeconds; // Instance field

    // Constructor (must be private or package-private)
    private TrafficLight(String action, int durationSeconds) {
        this.action = action;
        this.durationSeconds = durationSeconds;
    }

    public String getAction() {
        return action;
    }

    public int getDurationSeconds() {
        return durationSeconds;
    }

    public void displayInfo() {
        System.out.println("Light: " + this.name() +
                           ", Action: " + getAction() +
                           ", Duration: " + getDurationSeconds() + " seconds.");
    }
}

public class TrafficLightTest {
    public static void main(String[] args) {
        TrafficLight currentLight = TrafficLight.RED;
        currentLight.displayInfo(); // Output: Light: RED, Action: Stop, Duration: 60 seconds.

        TrafficLight.YELLOW.displayInfo(); // Output: Light: YELLOW, Action: Caution, Duration: 5 seconds.

        System.out.println("\nIterating through traffic lights:");
        for (TrafficLight light : TrafficLight.values()) {
            System.out.println(light.name() + " means: " + light.getAction());
        }
    }
}`


**When to Use Enums:**

1) When you have a small, fixed set of constants that represent something meaningful.

2) Days of the week, months of the year, seasons.

3) States in a state machine (e.g., PENDING, PROCESSING, COMPLETED, FAILED).

4) Cardinal directions (NORTH, SOUTH, EAST, WEST).

5) Menu options, product sizes (SMALL, MEDIUM, LARGE).

6) Error codes or status codes.

Enums in Java are much more powerful than simple integer constants and contribute to writing more robust, readable, and maintainable code.


**What is Annotation**:-
An Annotation in Java is a form of metadata (data about data) that you can add to your Java source code. They provide additional information about the program elements (like classes, methods, fields, parameters, etc.) but do not directly affect the execution of the code itself. Think of them as labels or tags that you attach to your code.

> we can also create our own annotations.
> we have default as well.
    1) @Override :- for mothod ovveride
    2) @Deprecated :- we can use for classes, by this the other can know the class is deprecated


An Annotation in Java is a form of metadata (data about data) that you can add to your Java source code. They provide additional information about the program elements (like classes, methods, fields, parameters, etc.) but do not directly affect the execution of the code itself. Think of them as labels or tags that you attach to your code.

Annotations are preceded by an "at" sign (@) followed by the annotation type name.

**Purpose of Annotations:**

Annotations serve several purposes:

**1 Information for the Compiler:**

> Annotations can be used by the compiler to detect errors or suppress warnings.

> **Example**:
    !) @Override: Tells the compiler that the annotated method is intended to override a method in a superclass. If it doesn't, the compiler generates an error.

    2) @Deprecated: Indicates that the annotated element (class, method, field) is deprecated and should no longer be used. The compiler generates a warning if deprecated code is used.

    3) @SuppressWarnings: Instructs the compiler to suppress specific warnings it might otherwise generate (e.g., @SuppressWarnings("unchecked")).

**2 Compile-time and Deployment-time Processing:**

> Software tools (like build tools, IDEs, or custom annotation processors) can process annotation information to generate code, XML files, or perform other setup tasks.

> Example:
    1) Frameworks like Lombok use annotations (@Getter, @Setter, @ToString) to automatically generate boilerplate code during compilation.

    2) JAXB (Java Architecture for XML Binding) uses annotations (@XmlElement, @XmlRootElement) to map Java objects to XML and vice-versa.

**3 Runtime Processing:**

> Some annotations are available to be examined at runtime using Java Reflection. This allows frameworks or applications to alter behavior based on the presence and values of these annotations.

> Example:
    1) JUnit uses annotations like @Test, @BeforeEach, @AfterEach to identify test methods and control the test execution flow.

    2) Spring Framework heavily uses annotations like @Component, @Service, @Autowired, @RequestMapping for dependency injection, defining beans, and mapping web requests.

**Types of Annotations:**
**1 Built-in (Predefined) Annotations:** Java provides several standard annotations:

    1) @Override: Checks if the method is an override.

    2) @Deprecated: Marks the element as outdated.

    3) @SuppressWarnings: Suppresses compiler warnings.

    4) @SafeVarargs: Suppresses warnings for methods with varargs parameters of a generic type.

    5) @FunctionalInterface: Indicates that an interface is intended to be a functional interface (having a single abstract method), used primarily with lambda expressions.

    6) @RestController : it returns the data.

    7) @Controller : it returns the page name.

**2 Meta-Annotations**: These are annotations that are applied to other annotations. They describe how an annotation itself should behave.
    @Retention: Specifies how long the annotation information should be retained.

        > RetentionPolicy.SOURCE: Retained only in the source code, discarded by the compiler.

        > RetentionPolicy.CLASS: Retained by the compiler in the .class file but not available at runtime through reflection (default).

        > RetentionPolicy.RUNTIME: Retained in the .class file and available at runtime through reflection.

    @Target: Specifies the Java elements to which the annotation can be applied (e.g., ElementType.TYPE for classes, ElementType.METHOD for methods, ElementType.FIELD for fields).

    @Documented: Indicates that the annotation should be included in the Javadoc documentation of the annotated element.

    @Inherited: Indicates that an annotation applied to a class should be inherited by its subclasses. (Only applies to annotations on classes).

**3 Custom Annotations:** You can define your own annotations. This is done using the @interface keyword.
    1) Custom annotations can have elements (which look like method declarations in an interface) that can be assigned values when the annotation is used.

    2) These elements can have default values.

**Defining a Custom Annotation:**
`import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// Meta-annotations
@Retention(RetentionPolicy.RUNTIME) // Available at runtime
@Target(ElementType.METHOD)        // Can only be applied to methods
public @interface MyCustomAnnotation {
    String description() default "No description"; // Element with a default value
    int value();                                   // Element that must be provided
    String[] tags() default {};                    // Array element
}`


**Using an Annotation:
**`class MyClass {

    @Override
    public String toString() {
        return "MyClass instance";
    }

    @Deprecated
    public void oldMethod() {
        System.out.println("This is an old method.");
    }

    @MyCustomAnnotation(value = 10, description = "This is a special method", tags = {"important", "test"})
    public void specialMethod() {
        System.out.println("Executing special method.");
        // Logic to potentially read the annotation at runtime using reflection
        try {
            java.lang.reflect.Method method = this.getClass().getMethod("specialMethod");
            MyCustomAnnotation annotation = method.getAnnotation(MyCustomAnnotation.class);
            if (annotation != null) {
                System.out.println("Annotation Value: " + annotation.value());
                System.out.println("Annotation Description: " + annotation.description());
                System.out.println("Annotation Tags: " + java.util.Arrays.toString(annotation.tags()));
            }
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }
}`


**In summary:**
Annotations are a powerful mechanism in Java for adding metadata to code. They don't change the program's semantics directly but allow tools and runtime environments to interpret this metadata to perform various tasks like compile-time checks, code generation, or altering runtime behavior. They contribute significantly to making code more declarative and integrating with various frameworks.  

**Functional Interface**:- 
In Java, a functional interface is an interface that contains exactly one abstract method. This single abstract method is also known as its functional method.
Functional interfaces are a cornerstone of functional programming in Java, especially since the introduction of lambda expressions in Java 8. They provide target types for lambda expressions and method references.

**Key Characteristics and Features of Functional Interfaces:**

> **Single Abstract Method (SAM)**: This is the defining characteristic. The interface must have only one method that doesn't have an implementation.
    Methods from java.lang.Object (like toString(), equals(), hashCode()) that are declared in the interface do not count towards this single abstract method requirement because any class implementing the interface will already have implementations for these methods (either inherited from Object or overridden).
> **@FunctionalInterface Annotation**: While not strictly required, it's good practice to annotate a functional interface with @FunctionalInterface.
This annotation serves two purposes:
It informs the compiler that the interface is intended to be a functional interface.
The compiler will then produce an error if the annotated interface does not satisfy the conditions of a functional interface (e.g., if it has more than one abstract method, or no abstract methods).
This helps prevent accidental changes that might break the functional nature of the interface.
> **Can Contain Other Methods**: A functional interface can still have:
    Default Methods: These are methods with a default implementation, introduced in Java 8.
    Static Methods: These are methods associated with the interface itself, also introduced in Java 8.
    Private Methods: (Java 9+) Helper methods for default or static methods within the interface.

> **Target Type for Lambda Expressions and Method References**: The primary use of functional interfaces is to serve as the type for lambda expressions and method references. A lambda expression can be used wherever an instance of a functional interface is expected. The lambda's parameters and return type must match the abstract method of the functional interface.

**Type of Interface**:-
    1) Normal -  interface will have multiple methods
    2) Functional/SAM(Single Abstract Method) - interface will have single method.
    3) Marker - it will not have any methods(blank interface)

**Exceptions**:- handling of error 
**Types**  
    1) Runtime Exception(unchecked Exception) - arrayindexoutog length and many more
    2) SQL Exception(checke dexception) -  which comipiler force to fix

**Understanding the Difference First:**
**Checked Exceptions:**

These are exceptions that the compiler forces you to handle (either by using a try-catch block or by declaring the exception in the method signature using the throws keyword).

They typically represent exceptional conditions that are outside the immediate control of the program, often related to external resources or operations (e.g., I/O, network, database issues).

They are direct subclasses of java.lang.Exception (but not subclasses of java.lang.RuntimeException).

The idea is that these are conditions from which a well-written application might be able to recover.

**Unchecked Exceptions:**

These are exceptions that the compiler does not force you to handle.
They typically represent programming errors (bugs in your code, like null pointer access, array index out of bounds) or other unexpected conditions during runtime.

They are subclasses of java.lang.RuntimeException (which itself is a subclass of java.lang.Exception) or java.lang.Error.

While you can catch them, it's often better to fix the underlying code bug that causes them. Error types are generally not meant to be caught by applications as they represent serious problems from which recovery is usually not possible.

**Common Checked Exceptions:**

**IOException:**

Description: A general class of exceptions produced by failed or interrupted I/O operations. It's a superclass for many more specific I/O exceptions.

When it occurs: During file operations (reading/writing), network operations, etc.

Specific subclasses:

**FileNotFoundException**: Thrown when an attempt to open the file denoted by a specified pathname has failed because no such file exists.

**EOFException** (End Of File Exception): Signals that an end of file or end of stream has been reached unexpectedly during input.

**SocketException**: Signals that there is an error creating or accessing a Socket.

**ConnectException**: Signals that an error occurred while attempting to connect a socket to a remote address and port.

**UnknownHostException**: Thrown to indicate that the IP address of a host could not be determined.

**SQLException**:

Description: An exception that provides information on a database access error or other errors.

When it occurs: During interactions with databases using JDBC (e.g., connection issues, bad SQL syntax, data integrity violations).

**ClassNotFoundException**:

Description: Thrown when an application tries to load in a class through its string name using Class.forName() or ClassLoader.loadClass() methods and no definition for the class with the specified name could be found.

When it occurs: Often related to dynamic class loading, reflection, or classpath issues.

**NoSuchMethodException**:

Description: Thrown when a particular method cannot be found.

When it occurs: Typically during reflection when trying to access a method by name and its parameters.

**NoSuchFieldException**:

Description: Thrown when a particular field (variable) cannot be found.

When it occurs: Typically during reflection when trying to access a field by name.

**InterruptedException**:

Description: Thrown when a thread is waiting, sleeping, or otherwise occupied, and the thread is interrupted, either before or during the activity.

When it occurs: In multithreaded applications, often when Thread.sleep(), Object.wait(), or Thread.join() is interrupted.

**ParseException** (from java.text or other parsing libraries):

Description: Signals that an error has been reached unexpectedly while parsing.

When it occurs: When parsing strings into dates, numbers, or other formats, and the string is not in the expected format.

**TimeoutException** (from java.util.concurrent):

Description: Exception thrown when a blocking operation times out.

When it occurs: When operations that have a timeout (e.g., waiting for a future) exceed that timeout.

**Common Unchecked Exceptions (Subclasses of RuntimeException or Error):**

A. Subclasses of RuntimeException (Generally due to programming errors):

**NullPointerException** (NPE):

Description: Thrown when an application attempts to use null in a case where an object is required.

When it occurs: Accessing members (fields or methods) of a null object, or passing null to a method that doesn't expect it.

**ArrayIndexOutOfBoundsException**:

Description: Thrown to indicate that an array has been accessed with an illegal index. The index is either negative or greater than or equal to the size of the array.

When it occurs: Using an invalid index to access an array element.

**StringIndexOutOfBoundsException**:

Description: A subclass of IndexOutOfBoundsException thrown by String methods to indicate that an index is either negative or greater than the size of the string.

When it occurs: Using an invalid index with string operations like charAt().

**IllegalArgumentException**:

Description: Thrown to indicate that a method has been passed an illegal or inappropriate argument.

When it occurs: When a method receives a parameter value that is not valid for its intended use (e.g., passing a negative number to a method expecting a positive one).

**Specific subclass:**

**NumberFormatException**: Thrown when an application attempts to convert a string to one of the numeric types, but the string does not have the appropriate format.

**IllegalStateException**:

Description: Signals that a method has been invoked at an illegal or inappropriate time. In other words, the Java environment or Java application is not in an appropriate state for the requested operation.

When it occurs: Trying to use an object that hasn't been properly initialized or is in a closed state (e.g., calling next() on an Iterator that has no more elements).

**ClassCastException**:

Description: Thrown to indicate that the code has attempted to cast an object to a subclass of which it is not an instance.

When it occurs: Invalid type casting (e.g., Object o = "hello"; Integer i = (Integer) o;).

**ArithmeticException**:

Description: Thrown when an exceptional arithmetic condition has occurred.

When it occurs: Most commonly, division by zero with integers (int / 0). Floating-point division by zero results in Infinity or NaN, not an exception.

**UnsupportedOperationException**:

Description: Thrown to indicate that the requested operation is not supported.

When it occurs: For example, trying to add() or remove() elements from an unmodifiable collection (e.g., one created by Collections.unmodifiableList()).

**ConcurrentModificationException**:

Description: Thrown when an object is concurrently modified while it is being iterated over in a way that is not permissible.

When it occurs: Modifying a collection (e.g., adding or removing elements from an ArrayList) while iterating over it using a standard iterator (fail-fast iterator) without using the iterator's own remove() method.

B. Subclasses of Error (Serious problems, usually not recoverable by the application):

**StackOverflowError**:

Description: Thrown when a stack overflow occurs because an application recurses too deeply.

When it occurs: Infinite recursion or very deep recursive calls.

**OutOfMemoryError**:

Description: Thrown when the Java Virtual Machine cannot allocate an object because it is out of memory, and no more memory could be made available by the garbage collector.

When it occurs: Creating too many objects, memory leaks, insufficient heap size.

**NoClassDefFoundError**:

Description: Thrown if the Java Virtual Machine or a ClassLoader instance tries to load in the definition of a class (as part of a normal method call or as part of creating a new instance using the new expression) and no definition of the class could be found. This is different from ClassNotFoundException because NoClassDefFoundError means the class was available at compile time but cannot be found at runtime (often due to classpath issues at runtime, or failure in static initialization of the class).

Understanding these common exceptions will help you write more robust Java code and debug issues more effectively.

we can create our exception like ex.

`class DummyException extends Exception{
    public DummyException(String string){
        super(string); // it will call super class constructor
    }
}

throw new DummyException("the error which you want to throw")`

**throw**    

**Threads**
In Java, a thread is the smallest unit of processing that can be scheduled by an operating system. It's a lightweight, independent path of execution within a program. A single Java program can have multiple threads running concurrently, each performing a different task. This is known as multithreading.

**Why Use Threads?**

> Concurrency and Parallelism:
    **Concurrency**: Allows multiple tasks to appear to run at the same time by rapidly switching between them (useful on single-core processors).

    **Parallelism**: Allows multiple tasks to actually run at the same time on multi-core processors, significantly speeding up execution.

> Improved Responsiveness: In applications with a user interface (like desktop or mobile apps), threads can keep the UI responsive while background tasks (like file downloads, complex calculations) are being performed. Without threads, a long-running task would freeze the UI.

> Efficient Resource Utilization: Threads within the same process share the same memory space (heap), which makes communication between them faster and less resource-intensive than inter-process communication.

> Simplified Modeling: Some problems are naturally modeled using multiple concurrent actors or tasks.

> Server Applications: Web servers and application servers use threads to handle multiple client requests simultaneously.

**How to Create Threads in Java:**

There are two main ways to create threads:
1. By Extending the Thread Class:

    1.1) Create a new class that extends java.lang.Thread.

    1.2) Override the run() method in your class. This method contains the code that will be executed by the new thread.

    1.3) Create an instance of your new class.

    1.4) Call the start() method on the instance. This will cause the Java Virtual Machine (JVM) to call the run() method of your thread. Never call run() directly; this would execute the code in the current thread, not a new one.

`    class MyThread extends Thread {
        private String threadName;

        public MyThread(String name) {
            this.threadName = name;
            System.out.println("Creating " +  threadName );
        }

        @Override
        public void run() {
            System.out.println("Running " +  threadName );
            try {
                for(int i = 4; i > 0; i--) {
                    System.out.println("Thread: " + threadName + ", " + i);
                    // Let the thread sleep for a while.
                    Thread.sleep(50); // sleep for 50 milliseconds
                }
            } catch (InterruptedException e) {
                System.out.println("Thread " +  threadName + " interrupted.");
            }
            System.out.println("Thread " +  threadName + " exiting.");
        }
    }`

`    public class TestThreadClass {
    public static void main(String args[]) {
        MyThread T1 = new MyThread("Thread-1");
        T1.start(); // Start the first thread

        MyThread T2 = new MyThread("Thread-2");
        T2.start(); // Start the second thread
    }
    }`


2. By Implementing the Runnable Interface: (Generally Preferred)

    2.1) Create a new class that implements the java.lang.Runnable interface.

    2.2) Implement the run() method in your class.

    2.3) Create an instance of your new class (the Runnable object).

    2.4) Create an instance of the Thread class, passing your Runnable object to its constructor.

    2.5) Call the start() method on the Thread object.

`    class MyRunnable implements Runnable {
        private String runnableName;
        private Thread thread; // Optional: to manage the thread instance if needed

        public MyRunnable(String name) {
            this.runnableName = name;
            System.out.println("Creating " +  runnableName );
        }

        @Override
        public void run() {
            System.out.println("Running " +  runnableName );
            try {
                for(int i = 4; i > 0; i--) {
                    System.out.println("Runnable: " + runnableName + ", " + i);
                    Thread.sleep(50);
                }
            } catch (InterruptedException e) {
                System.out.println("Runnable " +  runnableName + " interrupted.");
            }
            System.out.println("Runnable " +  runnableName + " exiting.");
        }

        // Optional method to start the thread if managed internally
        public void start() {
            System.out.println("Starting " +  runnableName );
            if (thread == null) {
                thread = new Thread(this, runnableName); // Pass Runnable instance to Thread constructor
                thread.start();
            }
        }
    }`

`    public class TestRunnableInterface {
    public static void main(String args[]) {
        MyRunnable R1 = new MyRunnable("Runnable-1");
        // R1.start(); // If using the internal start method

        // Or create Thread object explicitly
        Thread T1 = new Thread(R1, "Thread-For-Runnable-1");
        T1.start();


        MyRunnable R2 = new MyRunnable("Runnable-2");
        Thread T2 = new Thread(R2, "Thread-For-Runnable-2");
        T2.start();
    }
    }`


**Why is Runnable often preferred?**
Java does not support multiple class inheritance. If your class already extends another class, you cannot extend Thread as well. Implementing Runnable allows for more flexibility as your class can still extend another class while also being runnable. It also promotes better separation of concerns (the task to be run vs. the mechanism of running it).

**Thread Lifecycle:**

A thread goes through various states in its lifecycle:

    1) NEW: The thread has been created but the start() method has not yet been called.

    2) RUNNABLE: The thread is ready to run and is waiting for CPU time. A thread in this state might actually be running or just eligible to run.

    3) BLOCKED: The thread is waiting to acquire a monitor lock (e.g., when trying to enter a synchronized block or method that is currently locked by another thread).

    4) WAITING: The thread is waiting indefinitely for another thread to perform a particular action. This happens when Object.wait(), Thread.join(), or LockSupport.park() is called.

    5) TIMED_WAITING: The thread is waiting for another thread to perform an action for up to a specified waiting time. This happens with timed versions of Thread.sleep(), Object.wait(timeout), Thread.join(timeout), etc.

    6) TERMINATED: The thread has completed its execution (its run() method has finished) or has been otherwise terminated.

**Synchronization (Crucial Concept):**
When multiple threads access shared, mutable resources (data), you need to control access to prevent issues like race conditions (where the outcome depends on the unpredictable order of thread execution) and data corruption. Java provides mechanisms for synchronization:

**synchronized keyword:**
    **Synchronized Methods**: When a method is declared synchronized, only one thread can execute that method (or any other synchronized method of the same object) at a time. It acquires an intrinsic lock (monitor lock) on the object instance.
    **Synchronized Blocks**: Allows for finer-grained control by synchronizing only a part of a method. You specify an object to lock on.

    `public void myMethod() {
        // non-critical section
        synchronized(this) { // or someOtherObject
            // critical section: only one thread at a time
        }
        // non-critical section
    }
    `
**volatile keyword**: Ensures that changes to a variable are immediately visible to other threads. It doesn't provide atomicity for compound actions but guarantees visibility.

**java.util.concurrent package**: Provides a rich set of concurrency utilities:

    Locks (ReentrantLock, ReadWriteLock): More flexible and powerful alternatives to synchronized.

    Atomic Variables (AtomicInteger, AtomicLong): Support lock-free thread-safe programming on single variables.

    Concurrent Collections (ConcurrentHashMap, CopyOnWriteArrayList): Thread-safe collection classes.

    Executor Framework (ExecutorService, ThreadPoolExecutor): For managing pools of worker threads, simplifying thread management.

    Synchronizers (Semaphore, CountDownLatch, CyclicBarrier): Tools for coordinating threads.

**Common Thread Methods:**
    1) start(): Begins thread execution.

    2) run(): Contains the code executed by the thread.

    3) sleep(long millis): Causes the current thread to pause for a specified time. (static method)

    4) join(): Waits for a thread to die (terminate).

    5) interrupt(): Interrupts a thread. The interrupted thread must check its interrupted status.

    6) isAlive(): Checks if a thread is still alive.

    7) setPriority(int newPriority), getPriority(): Set/get thread priority (though reliance on priority for correct program behavior is discouraged).

    8) yield(): A hint to the scheduler that the current thread is willing to yield its current use of a processor. (static method)

**Challenges with Multithreading:**
    1) Complexity: Writing correct multithreaded code is harder than single-threaded code.

    2) Synchronization Issues: Incorrect synchronization can lead to deadlocks, livelocks, race conditions, and starvation.

    3) Debugging: Debugging multithreaded applications can be difficult due to the non-deterministic nature of thread execution.

    4) Threads are a powerful tool in Java for building high-performance and responsive applications, but they require careful design and understanding of concurrency concepts.

**Collection API** :-  

**ArrayList**

comparator

comparable

**Stream API**
we can use streams only once

> Note
**class -> class uses extends**
**class -> interface uses implements**
**interface -> interface uses extends**





