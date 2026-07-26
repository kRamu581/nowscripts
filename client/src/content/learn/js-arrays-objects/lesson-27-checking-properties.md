---
title: "Checking if an Object has a Property"
type: "topic"
---

# Checking if an Object has a Property

How to check if an object has a given property and why this would be useful to know.

## ‘hasOwnProperty’ method

```javascript
var vehicle = {
 "year" : 2018,
 "make" : "Toyota",
 "model" : "Sienna"
};

gs.info(vehicle.hasOwnProperty("year"));  // <== true
gs.info(vehicle.hasOwnProperty("price")); // <== false
```
