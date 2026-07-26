---
title: "Comparisons"
type: "topic"
---

# Comparisons

Introducing and demonstrating comparisons and logical expressions when comparing variables.

```javascript
var a = 0;
var b = 1;

gs.info(a < b);   // output: true or false

gs.info(a = b);   // assigns b to a
gs.info(a == b);  // equals, output: true or false
gs.info(a != b);  // does not equal: output: true or false

var n = '3';
var i = 3;

gs.info(n == i);  // Output: true (same value) – because JavaScript is a ‘loosely typed language’
gs.info(n === i); // Checks for equality of value AND data type
```
