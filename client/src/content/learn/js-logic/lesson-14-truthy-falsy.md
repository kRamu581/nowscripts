---
title: "Truthy/Falsy"
type: "topic"
---

# Truthy/Falsy

Lesson 14 takes a look at what makes Boolean, integer, and even string variables true or false in a condition.

## Simple case of true and false:

```javascript
var boolTrue = true;
var boolFalse = false;
gs.info ('boolTrue=' + boolTrue + ' boolFalse=' + boolFalse);
```

## What about numbers?

```javascript
var num = 0; // <== try with different numbers

gs.info (num + ' is ' + ((num) ? 'true' : 'false'));
// Only returns false for 0, all other results are true
```

## Take a look at strings:

```javascript
var string1; // undefined, so gs.info would produce an error
var string2 = null; // an empty string, but not undefined
var string3 = 'Hello, world!';

gs.info ('string1=' + ((string1) ? 'true' : 'false')); // false
gs.info ('string2=' + ((string2) ? 'true' : 'false')); // false
gs.info ('string3=' + ((string3) ? 'true' : 'false')); // true
```
