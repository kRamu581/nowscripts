---
title: "Java OOPs Notes"
description: "Core CS fundamentals with Java code examples — OOP, data structures, memory, multithreading, and core language concepts commonly asked in interviews."
lastUpdated: "2026-08-26"
---

# oops — Java  Notes

*Core CS fundamentals with Java code examples — OOP, data structures, memory, multithreading, and core language concepts commonly asked in interviews.*

---

## 1. Java Basics

**Java** is a compiled + interpreted, statically-typed, object-oriented language. Code compiles to **bytecode** (`.class`), which runs on the **JVM (Java Virtual Machine)** — this is why Java is "write once, run anywhere."

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**JDK vs JRE vs JVM**
| Component | Role |
|---|---|
| **JVM** | Runs the bytecode (interprets/JIT-compiles to machine code) |
| **JRE** | JVM + core libraries — needed to *run* Java programs |
| **JDK** | JRE + compiler (`javac`) + dev tools — needed to *write & compile* Java |

**Likely interview Q:** *Why is Java platform-independent?* — Source code compiles to bytecode, not machine code. Any machine with a JVM can run that bytecode, regardless of OS/hardware.

---

## 2. Data Types & Variables

**Primitive types** (stored by value): `byte, short, int, long, float, double, char, boolean`

**Reference types** (stored by reference): objects, arrays, `String`, custom classes.

```java
int age = 25;               // primitive
double salary = 55000.50;   // primitive
char grade = 'A';           // primitive
boolean isActive = true;    // primitive

String name = "Sam";        // reference type
int[] numbers = {1, 2, 3};  // reference type (array)
```

**Likely interview Q:** *Primitive vs Reference type?* — Primitives store the actual value directly in memory (stack); reference types store a memory address pointing to the object (heap).

---

## 3. OOP — The 4 Pillars (with Java code)

### a) Encapsulation
Bundling data (fields) + methods together, restricting direct access using access modifiers.

```java
public class Employee {
    private double salary;   // hidden from outside

    public double getSalary() {          // controlled access
        return salary;
    }

    public void setSalary(double salary) {
        if (salary > 0) {                // validation logic
            this.salary = salary;
        }
    }
}
```

### b) Abstraction
Hiding implementation details, exposing only essential behavior — via **abstract classes** or **interfaces**.

```java
abstract class Shape {
    abstract double area();   // no implementation here
}

class Circle extends Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}
```

### c) Inheritance
A class acquires fields/methods of another class using `extends`.

```java
class Animal {
    void eat() { System.out.println("This animal eats food"); }
}

class Dog extends Animal {
    void bark() { System.out.println("Dog barks"); }
}

// Dog d = new Dog();
// d.eat();  -> inherited from Animal
// d.bark(); -> own method
```

### d) Polymorphism
Same method behaves differently — **Compile-time (overloading)** vs **Runtime (overriding)**.

```java
// Overloading (compile-time polymorphism)
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

// Overriding (runtime polymorphism)
class Animal {
    void sound() { System.out.println("Animal makes a sound"); }
}
class Cat extends Animal {
    @Override
    void sound() { System.out.println("Cat meows"); }
}
```

**Likely interview Q:** *Overloading vs Overriding?* — Overloading = same method name, different parameters, resolved at **compile time**. Overriding = subclass redefines a parent method with the **same signature**, resolved at **runtime**.

---

## 4. Class vs Object, Constructors

```java
class Car {
    String model;

    // Constructor
    Car(String model) {
        this.model = model;
    }

    void drive() {
        System.out.println(model + " is driving");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car("Tesla");  // object (instance)
        myCar.drive();
    }
}
```

- **Class** — blueprint (no memory allocated until instantiated).
- **Object** — instance of a class, created with `new`.
- **Constructor** — special method called when object is created; same name as class, no return type.

---

## 5. Interface vs Abstract Class

```java
interface Vehicle {
    void start();          // implicitly public + abstract
}

abstract class AbstractVehicle {
    abstract void start();
    void stop() { System.out.println("Stopping..."); }  // can have concrete methods
}

class Car implements Vehicle {
    public void start() { System.out.println("Car starting"); }
}
```

| Interface | Abstract Class |
|---|---|
| 100% abstraction (before Java 8) | Can mix abstract + concrete methods |
| No constructors | Can have constructors |
| Multiple inheritance supported (`implements A, B`) | Single inheritance only (`extends`) |
| All fields are `public static final` | Can have any field type |

**Likely interview Q:** *When to use interface vs abstract class?* — Use an interface to define a **contract/capability** (e.g., `Comparable`, `Runnable`) that unrelated classes can share; use an abstract class when classes share **common code** and a clear "is-a" relationship.

---

## 6. Exception Handling

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("This always runs");
        }
    }
}
```

**Checked vs Unchecked exceptions**
| Checked | Unchecked |
|---|---|
| Checked at compile time | Occur at runtime |
| Must be declared/handled (`throws`, `try-catch`) | Not required to be handled |
| Eg: `IOException`, `SQLException` | Eg: `NullPointerException`, `ArithmeticException` |

**Custom exception**
```java
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}
```

---

## 7. Collections Framework (Data Structures in Java)

| Interface | Implementation | Trait |
|---|---|---|
| `List` | `ArrayList` | Ordered, allows duplicates, fast random access |
| `List` | `LinkedList` | Ordered, fast insert/delete, doubly-linked |
| `Set` | `HashSet` | No duplicates, no order guaranteed |
| `Set` | `TreeSet` | No duplicates, sorted order |
| `Map` | `HashMap` | Key-value pairs, no order guaranteed |
| `Map` | `TreeMap` | Key-value pairs, sorted by key |
| `Queue` | `LinkedList`/`ArrayDeque` | FIFO |
| `Deque` | `ArrayDeque` | Stack (LIFO) or Queue (FIFO) |

```java
import java.util.*;

List<String> names = new ArrayList<>();
names.add("Sam");
names.add("Ram");

Map<String, Integer> ages = new HashMap<>();
ages.put("Sam", 26);
ages.put("Ram", 19);

Set<Integer> uniqueIds = new HashSet<>();
uniqueIds.add(1);
uniqueIds.add(1);   // duplicate ignored

Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
stack.pop();   // removes 2 (LIFO)

Queue<Integer> queue = new LinkedList<>();
queue.offer(1);
queue.offer(2);
queue.poll();  // removes 1 (FIFO)
```

**Likely interview Q:** *ArrayList vs LinkedList?* — `ArrayList` uses a dynamic array — O(1) random access, O(n) insert/delete in the middle. `LinkedList` uses nodes with pointers — O(1) insert/delete (given a reference), O(n) access.

**Likely interview Q:** *HashMap vs TreeMap?* — `HashMap` gives O(1) average lookup, no ordering. `TreeMap` maintains sorted key order, O(log n) operations (backed by a Red-Black tree).

---

## 8. String Handling

```java
String a = "hello";
String b = "hello";
String c = new String("hello");

System.out.println(a == b);        // true  (same reference, String pool)
System.out.println(a == c);        // false (different object in heap)
System.out.println(a.equals(c));   // true  (compares actual value)
```

- **String is immutable** in Java — every modification creates a new object.
- **String pool** — literal strings are cached/reused for memory efficiency.
- `StringBuilder` / `StringBuffer` — mutable alternatives for heavy string manipulation.

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");
System.out.println(sb.toString());   // Hello World
```

**Likely interview Q:** *StringBuilder vs StringBuffer?* — Same API, but `StringBuffer` is **synchronized** (thread-safe, slower); `StringBuilder` is **not synchronized** (faster, use in single-threaded contexts).

---

## 9. Memory Management — Stack vs Heap, Garbage Collection

```java
public class Main {
    public static void main(String[] args) {
        int x = 10;                 // stored on Stack
        Employee e = new Employee(); // reference 'e' on Stack, object on Heap
    }
}
```

| Stack | Heap |
|---|---|
| Stores primitive values & references | Stores actual objects |
| Fast access, LIFO | Slower access, dynamically managed |
| Memory freed automatically on method return | Freed by **Garbage Collector** |

**Garbage Collection (GC)** — JVM automatically reclaims memory of objects no longer referenced, so developers don't manually free memory (unlike C/C++).

**Likely interview Q:** *How does Java manage memory automatically?* — The JVM's Garbage Collector periodically identifies objects with no active references (unreachable) and reclaims their heap memory.

---

## 10. Multithreading Basics

```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start();   // starts new thread (NOT t1.run() directly)
    }
}
```

**Using Runnable (preferred — allows extending other classes too):**
```java
class MyTask implements Runnable {
    public void run() {
        System.out.println("Task running on: " + Thread.currentThread().getName());
    }
}

Thread t = new Thread(new MyTask());
t.start();
```

**Synchronization** — prevents race conditions when multiple threads access shared data.
```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }
}
```

**Likely interview Q:** *start() vs run()?* — `start()` creates a new thread and calls `run()` on it asynchronously; calling `run()` directly just executes it like a normal method on the current thread (no new thread created).

---

## 11. Static vs Instance, `final` keyword

```java
class Counter {
    static int totalCount = 0;   // shared across all instances
    int id;                      // unique per instance

    Counter() {
        totalCount++;
        id = totalCount;
    }
}

final class MathConstants {      // cannot be extended
    static final double PI = 3.14159;  // constant, cannot be reassigned
}
```

- `static` — belongs to the class, not any instance; shared across all objects.
- `final` — on a variable = constant; on a method = cannot be overridden; on a class = cannot be extended.

---

## 12. Java Program Execution Flow

1. `.java` file written (source code)
2. `javac` compiles it → `.class` file (bytecode)
3. JVM loads the `.class` file (**Class Loader**)
4. **Bytecode Verifier** checks for security/format issues
5. JVM's **Execution Engine** interprets or JIT-compiles bytecode → machine code
6. Program runs

**Likely interview Q:** *What is JIT compilation?* — Just-In-Time compilation converts frequently-used bytecode into native machine code at runtime, improving performance over pure interpretation.

---

## Quick-Fire Java Interview Summary Table

| Concept | One-line answer |
|---|---|
| JDK vs JRE vs JVM | Dev kit (compiler+tools) vs runtime (libs+JVM) vs bytecode executor |
| Overloading vs Overriding | Same name/diff params, compile-time vs same signature in subclass, runtime |
| Interface vs Abstract class | Pure contract, multiple inheritance vs shared code, single inheritance |
| Checked vs Unchecked exception | Compile-time enforced vs runtime only |
| ArrayList vs LinkedList | Fast access/slow insert vs slow access/fast insert |
| HashMap vs TreeMap | O(1) unordered vs O(log n) sorted |
| Stack vs Heap | Primitives & references, auto-freed vs objects, GC-managed |
| `==` vs `.equals()` | Reference comparison vs value comparison |
| StringBuilder vs StringBuffer | Not thread-safe (fast) vs thread-safe (slower) |
| `start()` vs `run()` | New thread, async vs runs on current thread, no new thread |

---

*All examples are simplified for interview-recall purposes — test-run any snippet in a Java IDE/compiler for exact behavior on your JDK version.*
