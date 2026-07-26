---
title: "Statements and Syntax"
type: "topic"
---

# Statements and syntax

This lesson covers the basics of JavaScript syntax and when semicolons should/shouldn’t be used.

## 2.1 When semicolons are required

```javascript
var i = 0; i++ // <-- semicolon obligatory
               // (but optional before newline)
var i = 0      // <-- semicolon optional
    i++        // <-- semicolon optional
```

## 2.2 When semicolons are optional

```javascript
var i;               // variable declaration
i = 5;               // value assignment
i = i + 1;           // value assignment
i++;                 // same as above
var x = 9;           // declaration & assignment
var fun = function() {...}; // var declaration, assignment, and func. definition
alert("hi");         // function call
```

## 2.3 When to avoid semicolons

NO semicolons after `}`:

```javascript
if (...) {...} else {...}
for (...) {...}
while (...) {...}
```

BUT:

```javascript
do {...} while (...);
```

Function statements:

```javascript
function (arg) { /*do this*/ } // NO semicolon after ‘}’
```

Exception:

```javascript
for (var i=0; i < 10; i++) {/*actions*/} // Correct
for (var i=0; i < 10; i++;) {/*actions*/} // This will cause a syntax error
```
