---
title: "Data Type Conversions"
type: "topic"
---

# Data Type Conversions

Lesson 8 shows you how to convert an integer to a string, a string to an integer, and how to determine what type of variable you have if you're not sure.

```javascript
var i = 5;
var iStr = i.toString(); // convert an integer to a string

gs.info('type of I = ' + typeof i);
gs.info('type of iString = ' + typeof iStr); // variable type

var n = parseInt(iStr); // convert a string into a number
gs.info(typeof n + ' n=' + n);

var n = parseFloat(iStr); // convert a string into a floating point number
```
