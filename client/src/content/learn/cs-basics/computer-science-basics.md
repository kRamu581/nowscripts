---
title: "Computer Science Basics"
description: "Core CS basics concepts commonly asked in interviews — computer architecture, number systems, OS, networking, and programming fundamentals."
lastUpdated: "2026-08-16"
---

# Computer Science Fundamentals — Interview Prep Notes

*Core "CS basics" concepts commonly asked in interviews — computer architecture, number systems, OS, networking, and programming fundamentals.*

---

## 1. What is a Computer?

A computer is an electronic device that takes **input**, **processes** it, and produces **output**, using a set of instructions (a program).

**Basic cycle:** Input → Process → Output → Storage (IPOS cycle)

**Two main components:**
- **Hardware** — physical parts (CPU, RAM, hard disk, keyboard, monitor, etc.)
- **Software** — set of instructions/programs that tell hardware what to do
  - **System software** — manages hardware (e.g., Operating System, drivers)
  - **Application software** — performs user tasks (e.g., browser, MS Word)

**Likely interview Q:** *Hardware vs Software?* — Hardware is physical/tangible; software is a set of instructions (intangible) that runs on hardware.

---

## 2. CPU & Computer Architecture

**CPU (Central Processing Unit)** — the "brain" of the computer; executes instructions.

**Main parts of CPU:**
- **ALU (Arithmetic Logic Unit)** — performs arithmetic and logical operations
- **CU (Control Unit)** — directs operation of the processor, tells other parts what to do
- **Registers** — small, very fast storage inside CPU for temporary data

**Fetch–Decode–Execute cycle:**
1. **Fetch** — CPU retrieves instruction from memory
2. **Decode** — CPU interprets what the instruction means
3. **Execute** — CPU carries out the instruction

**Memory hierarchy (fastest/smallest → slowest/largest):**
`Registers → Cache (L1/L2/L3) → RAM → SSD/HDD → Cloud/Tape`

**RAM vs ROM**
| RAM | ROM |
|---|---|
| Volatile (data lost on power off) | Non-volatile (data retained) |
| Read & write | Mostly read-only |
| Used for active/running processes | Stores firmware/boot instructions |

**Primary vs Secondary storage**
- **Primary** — RAM, cache (fast, temporary, directly accessed by CPU)
- **Secondary** — HDD, SSD, USB (permanent storage, slower)

**Likely interview Q:** *What happens when you turn on a computer?* — Power on → BIOS/UEFI runs POST (Power-On Self Test) → bootloader loads → Operating System loads into RAM → OS initializes and hands control to the user.

---

## 3. Number Systems & Data Representation

Computers store everything as **binary** (0s and 1s) because digital circuits have two states: ON/OFF.

| System | Base | Digits used |
|---|---|---|
| Binary | 2 | 0, 1 |
| Octal | 8 | 0–7 |
| Decimal | 10 | 0–9 |
| Hexadecimal | 16 | 0–9, A–F |

**Units of data (bit → byte → ... ):**
`8 bits = 1 Byte → 1024 Bytes = 1 KB → 1024 KB = 1 MB → 1024 MB = 1 GB → 1024 GB = 1 TB`

**Bit vs Byte** — a bit is a single binary digit (0/1); a byte is a group of 8 bits.

**ASCII / Unicode** — schemes that map characters (letters, symbols) to numeric binary codes so computers can store text.

**Likely interview Q:** *Convert decimal 25 to binary?* → `11001` (16+8+1 = 25).

---

## 4. Operating Systems (OS)

An **Operating System** is software that manages hardware resources and provides services for application programs. It sits between hardware and the user.

**Key functions of an OS:**
- **Process management** — creating, scheduling, terminating processes
- **Memory management** — allocating/deallocating RAM to processes
- **File system management** — organizing and accessing files on storage
- **Device management** — controlling I/O devices via drivers
- **Security & access control** — user permissions, authentication

**Process vs Thread**
| Process | Thread |
|---|---|
| Independent program in execution | A lightweight unit of execution *within* a process |
| Has its own memory space | Shares memory with other threads in same process |
| Heavier to create/switch | Lighter, faster to create/switch |

**Process states:** New → Ready → Running → Waiting/Blocked → Terminated

**Multitasking vs Multithreading vs Multiprocessing**
- **Multitasking** — OS runs multiple processes seemingly at once (time-sharing on CPU)
- **Multithreading** — a single process runs multiple threads concurrently
- **Multiprocessing** — multiple CPUs/cores execute processes in true parallel

**Deadlock** — a situation where two or more processes are stuck waiting on each other's resources forever.
- **4 necessary conditions:** Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.

**Virtual Memory** — technique that lets a program use more memory than physically available RAM by using disk space as an extension (paging/swapping).

**Likely interview Q:** *Process vs Thread — why are threads faster?* — Threads share the same memory/resources of their parent process, so context-switching between threads costs less than switching between full processes.

---

## 5. Networking Basics

**Network** — a group of connected computers that share resources/data.

**Types of networks:**
- **LAN** (Local Area Network) — small area, e.g., office/home
- **WAN** (Wide Area Network) — large area, e.g., the internet
- **MAN** (Metropolitan Area Network) — city-wide

**OSI Model (7 layers)** — conceptual model of how data travels across a network:
1. **Physical** — raw bits, cables, signals
2. **Data Link** — MAC addresses, frames (e.g., Ethernet)
3. **Network** — IP addresses, routing (e.g., IP)
4. **Transport** — reliable delivery (e.g., TCP, UDP)
5. **Session** — manages sessions/connections
6. **Presentation** — data formatting, encryption
7. **Application** — user-facing protocols (HTTP, FTP, SMTP)

*(Mnemonic: "Please Do Not Throw Sausage Pizza Away")*

**TCP vs UDP**
| TCP | UDP |
|---|---|
| Connection-oriented | Connectionless |
| Reliable, ordered delivery | Fast, no delivery guarantee |
| Used for: web browsing, email, file transfer | Used for: video streaming, gaming, DNS |

**IP Address** — a unique numerical label identifying a device on a network (IPv4: e.g., `192.168.1.1`; IPv6: longer, hex format for more addresses).

**DNS (Domain Name System)** — translates human-readable domain names (google.com) into IP addresses.

**HTTP vs HTTPS** — HTTPS is HTTP + SSL/TLS encryption for secure data transfer.

**Client-Server model** — clients request services/resources; servers provide them.

**Likely interview Q:** *What happens when you type a URL and hit Enter?* → DNS lookup resolves domain to IP → browser establishes TCP connection (and TLS handshake if HTTPS) → browser sends HTTP request → server responds with data → browser renders the page.

---

## 6. Programming & OOP Fundamentals

**Compiler vs Interpreter**
| Compiler | Interpreter |
|---|---|
| Translates entire code to machine code before running | Translates & executes line-by-line |
| Faster execution after compiling | Slower execution, easier to debug |
| Eg: C, C++ | Eg: Python, JavaScript (traditionally) |

**Static vs Dynamic typing**
- **Static** — variable types checked at compile time (e.g., Java, C++)
- **Dynamic** — variable types checked at runtime (e.g., Python, JavaScript)

**4 Pillars of OOP (Object-Oriented Programming):**
1. **Encapsulation** — bundling data + methods together, restricting direct access (via private/public)
2. **Abstraction** — hiding implementation details, showing only essential features
3. **Inheritance** — a class can acquire properties/behavior of another class
4. **Polymorphism** — same function/method behaves differently based on context (method overloading/overriding)

**Class vs Object**
- **Class** — blueprint/template
- **Object** — an instance of a class

**Likely interview Q:** *Abstraction vs Encapsulation?* — Abstraction hides *complexity* (what's shown to the user); Encapsulation hides *data* (how it's protected/bundled internally). Abstraction is about design, encapsulation is about implementation.

---

## 7. Data Structures Basics

| Structure | Key trait | Common use |
|---|---|---|
| **Array** | Fixed-size, contiguous memory, O(1) index access | Lookups by position |
| **Linked List** | Nodes linked via pointers, dynamic size | Frequent insert/delete |
| **Stack** | LIFO (Last In First Out) | Undo functionality, function call stack |
| **Queue** | FIFO (First In First Out) | Task scheduling, print queue |
| **Hash Table/Map** | Key-value pairs, O(1) avg lookup | Fast lookups, caching |
| **Tree** | Hierarchical, nodes with children | File systems, hierarchical data |
| **Graph** | Nodes (vertices) + edges | Networks, maps, relationships |

**Likely interview Q:** *Array vs Linked List?* — Arrays offer O(1) random access but costly insert/delete (shifting elements); linked lists offer O(1) insert/delete (at known position) but O(n) access since you must traverse.

**Time complexity basics (Big O):**
- `O(1)` — constant time (best)
- `O(log n)` — logarithmic (e.g., binary search)
- `O(n)` — linear (e.g., simple loop)
- `O(n log n)` — typical efficient sort (merge sort, quicksort avg)
- `O(n²)` — nested loops (e.g., bubble sort)

---

## 8. Software Engineering Basics

**SDLC (Software Development Life Cycle)** — Requirements → Design → Development → Testing → Deployment → Maintenance.

**Version Control** — a system (like Git) to track changes to code over time and enable collaboration.
- `git commit` — save a snapshot of changes
- `git branch` — create a separate line of development
- `git merge` — combine changes from branches

**API (Application Programming Interface)** — a set of rules that lets two software systems communicate (e.g., a REST API lets a frontend talk to a backend over HTTP).

**Frontend vs Backend**
- **Frontend** — what the user sees/interacts with (UI, client-side)
- **Backend** — server-side logic, database, business rules

**Likely interview Q:** *What is an API, in simple terms?* — A contract/interface that lets one piece of software request data or functionality from another, without needing to know its internal implementation.

---

## Quick-Fire CS Fundamentals Summary Table

| Concept | One-line answer |
|---|---|
| Hardware vs Software | Physical parts vs instructions that run on them |
| RAM vs ROM | Volatile/read-write vs non-volatile/read-only |
| Process vs Thread | Independent program vs lightweight unit sharing process memory |
| TCP vs UDP | Reliable & ordered vs fast & connectionless |
| Compiler vs Interpreter | Translates all code upfront vs line-by-line |
| Abstraction vs Encapsulation | Hides complexity vs hides/protects data |
| Array vs Linked List | Fast access, slow insert/delete vs slow access, fast insert/delete |
| Client vs Server | Requests services vs provides services |
| Deadlock 4 conditions | Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait |
| DNS | Translates domain names into IP addresses |

---

*These are foundational "CS 101"-level concepts commonly asked as warm-up or screening questions across tech interviews, regardless of specific role.*
