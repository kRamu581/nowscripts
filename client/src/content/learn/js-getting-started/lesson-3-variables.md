---
title: "Variables"
type: "topic"
---

# Variables

This lesson demonstrates some simple scalar (or primitive) variable types, how to declare and set them and best practices for naming your variables.

## 3.1 Simple variables & good/bad variable names

```javascript
var name = 'Chuck';    // Simple string variable
var i = 0;             // Simple integer variable
var answer = true;     // Simple Boolean variable
```

## 3.2 Naming examples

Examples of what not to do:

```javascript
var c = "http://www.amazon.com"; // ‘c’ is not descriptive enough
var case = 'CASE0010001';        // ‘case’ is a reserved word
var lastEntryInTheListWithRelatedRecords = true; // Too long
```

Rather than variable names such as ‘person’, it’s best to put the variable type on the end of the var name, e.g.:

```javascript
personCount    // Indicates a counter/integer
personList     // Must be a list
personObj      // Object
personGr       // GlideRecord
```
