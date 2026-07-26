---
title: "Simple Arithmetic Operators"
type: "topic"
---

# Simple Arithmetic Operators

This lesson covers some simple arithmetic operators to help you understand how to add, subtract, multiply, divide, and modulo (the remainder of division). It also includes some time saving shortcuts.

```javascript
// Assignment
var a = 12;
var b = 3;

// Addition
gs.info(2 + 2);
gs.info(a + 2);
b = b + 2;
// b += 2; // shorthand for the line above
gs.info(a + b);

// Increment by 1
a++; /* or ‘++a;’ is the same thing */ gs.info(a);

// Decrement by 1
b--; gs.info(b);

// Multiply
gs.info(a * b);

// Division
gs.info(a / b);

// Modulo - get the remainder of a division
gs.info('');
gs.info(a);
gs.info(b);
gs.info(a % b);

var c = (5 + 4) * 2;
gs.info(c); // output is 18
```
