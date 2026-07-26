---
title: "Functions"
type: "topic"
---

# Functions

Lesson 19 introduces you to the topic of functions. You will learn when and why you might want to build a function, how to pass information in to a function and how to get information out. It also demonstrates how to call a function from within another function.

## 19.1 Functions

```javascript
function sayHello() { // a function without parameters
 gs.info('Hello');
}

sayHello(); // call the function
```

## 19.2 Function with a parameter

```javascript
function toCelsius(fahrenheit) {
 var c = (5 / 9) * (fahrenheit - 32);
 gs.info(c);
}

toCelsius(32);
toCelsius(100);
```

## 19.3 Function with a return value

```javascript
function toCelsius(fahrenheit) {
 return (5 / 9) * (fahrenheit - 32); // return – used to get a value out of a function
}

var c = toCelsius(32);
gs.info(c);
c = toCelsius(212);
gs.info(c);
```

## 19.4 Local variables scope

```javascript
function toCelsius(fahrenheit) {
 // c is only known in the function toCelsius()
 var c = (5 / 9) * (fahrenheit - 32);
 return c; // c is a local variable within this function
}

gs.info(c); // Here, c is out of scope – it will return c is undefined
```

## 19.5 - Global variables and local

```javascript
var convertTo = 'F';

function toCelsius(f) {
 var c = (5 / 9) * (f - 32);
 return c;
}

function toFahrenheit(c) {
 var f = c * 9 / 5 + 32;
 return f;
}

function convertTemp(temp) {
 // use the global variable to determine conversion
 if (convertTo == 'C') {
   return toCelsius(temp);
 } else {
   return toFahrenheit(temp);
 }
}

gs.info(convertTemp(100));
```

## 19.6 Self running function

```javascript
// This code is outside the function
var i = 20;

(function() {
 // Local variable
 var i = 10; // uh-oh, forgot the var! (added var here to fix the example)
 gs.info('i=' + i);
}());

i = 3;
gs.info('i=' + i);
```
