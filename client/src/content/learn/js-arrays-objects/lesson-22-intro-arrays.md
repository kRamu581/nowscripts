---
title: "Introduction to Arrays"
type: "topic"
---

# Introduction to Arrays

Introducing the concept of arrays. Arrays are a great way to keep a list of the same data type (integer, string, etc.) in memory and address them as one unit or individually.

## 22.1 Making a simple array

```javascript
var list = [];
list[0] = 1; // The first position is always 0.
list[1] = 3;
list[2] = 5;

gs.info('length of list is: ' + list.length); // In this case, returns ‘3’
```

Alternatively, make an optional declaration, but this method is not preferred:

```javascript
// var list = Array();
```

A shorter way:

```javascript
var list = [1, 3, 5];
gs.info('length of list is: ' + list.length);
```

## 22.2 Loops and arrays

```javascript
var list = [1, 3, 5];
for (var i = 0; i < list.length; i++) {
 gs.info('i=' + i + ' value=' + list[i]);
}
```

A slightly better way:

```javascript
var list = [1, 3, 5];
var len = list.length;
for (var i = 0; i < len; i++) {
 gs.info('i=' + i + ' value=' + list[i]);
}
```
