---
title: "The If Statement and Boolean Logic"
type: "topic"
---

# The If Statement and Boolean Logic

In lesson 11, you learn about the if statement for controlling the flow of your JavaScript. This video also takes a look at basic Boolean logic with AND, OR, and NOT operators to make more complex logical comparisons.

## 11.1 If statements

```javascript
var a = 1; var b = 3; var c = 5;

if (a < b)
  gs.info('a is less than b');

var bool = a < b;
if (bool) {
  gs.info ('a is less than b');
} else { /* ... */ }

// else
if (a < b)
 gs.info('a is less than b');
else
 gs.info('a is greater than or equal to b');

// Else if and else
if (a < b)
 gs.info('a is less than b');
else if (a > b)
 gs.info('a is greater than b');
else if (a == b)
 gs.info('a equals b');
else
 gs.info('Uh-oh');

if (a < b)
 if (b < c)
   gs.info('a b c are in order');
```

## 11.2 Boolean logic tables

```javascript
// AND (&&) - both must be true
// +---------+---------+---------+
// |   AND   |  true   |  false  |
// +---------+---------+---------+
// |  true   |  true   |  false  |
// +---------+---------+---------+
// |  false  |  false  |  false  |
// +---------+---------+---------+

// OR (||) - Either must be true
// +---------+---------+---------+
// |   OR    |  true   |  false  |
// +---------+---------+---------+
// |  true   |  true   |  true   |
// +---------+---------+---------+
// |  false  |  true   |  false  |
// +---------+---------+---------+

// NOT (!) - reverse the logic
// +---------+---------+---------+
// |   NOT   |  true   |  false  |
// +---------+---------+---------+
// |         |  false  |  true   |
// +---------+---------+---------+
```

## 11.3 Boolean logic code examples

```javascript
var a = 1;
var b = 3;
var c = 5;

if (a < b && b < c)
 gs.info ('a b c are in order');

if (b > a || b > c)
 gs.info ('b is greater than one of them.');

// Note, indentation can be deceptive!!!
if (a < b)
 if (b < c) {
   gs.info('a b c are in order');
   gs.info(' that means a is less than c');
 }
else
 gs.info('a is greater than or equal to b');

var valveOpen = true;

if (valveOpen == true)
 gs.info('Valve is currently open');

if (bool)
 gs.info('Valve is currently open');

var valveOpen = false;
if (!valveOpen)
 gs.info('Valve is currently closed');
```
