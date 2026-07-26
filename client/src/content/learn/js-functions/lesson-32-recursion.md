---
title: "Recursion"
type: "topic"
---

# Recursion

Recursion is the concept of a function calling itself. While this may seem like a crazy idea, it is a very powerful tool when dealing with hierarchical data like business services. However, there are some things about recursion you need to pay attention to, or you could find yourself in an infinite loop.

An example of where recursion is used is anywhere there is a parent-child relationship with records (e.g. tasks, CIs, etc.) You can recurse "up" the CI tree to find the parent service, or recurse "down" to start with a service and ensure you find all the child/related CIs.

It’s a similar concept to the way Service Watch works for business service discovery.

The following function calculates the factorial of x (often written as ‘x!’) e.g. 5! = 5 x 4 x 3 x 2 x 1 = 120

```javascript
function factorial(x) {
 // TERMINATION
 if (x < 0)
   return;

 // BASE
 if (x === 0) 
   // === not only compares the value, but also the type. 
   // For example: "1" == 1 is true, whereas "1" === 1 is false 
   // because a string and an integer are different types.
   return 1;

 // RECURSION
 return x * factorial(x - 1);
}

gs.info(factorial(3)); // Returns 6
```
