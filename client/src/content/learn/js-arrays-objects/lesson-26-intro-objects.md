---
title: "Introduction to Objects"
type: "topic"
---

# Introduction to Objects

Introducing the concept of JavaScript objects: what they are, and how to create and manage them.

## 26.1 Simple Objects

```javascript
var box = {}; // Alternative syntax: var box = new Object();
box.height = 20;
box.width = 10;
box.length = 10;
box.material = "cardboard";
box.open = true;

gs.info(box.material);
```

## 26.2 Bracket notation

An alternative syntax for defining object properties:

```javascript
var vehicle = {};
vehicle['year'] = 2018;
vehicle['make'] = "Toyota";
vehicle['model'] = "Sienna";

gs.info(vehicle['year'] + ' ' + vehicle['make'] + ' ' + vehicle['model']);
```

## 26.3 Shortcut: JSON format

Initializing and setting name/value pairs at the same time: using JSON (JavaScript Object Notation) format declaration:

```javascript
var vehicle = {
 "year" : 2018, // It’s best to use double quotes, although single quotes may work
 "make" : "Toyota",
 "model" : "Sienna"
};

gs.info(vehicle['year'] + ' ' + vehicle['make'] + ' ' + vehicle['model']);
```
