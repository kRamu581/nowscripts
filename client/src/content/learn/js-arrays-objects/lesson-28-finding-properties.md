---
title: "Finding All Properties in an Object"
type: "topic"
---

# Finding All Properties in an Object

How to find all properties within an object using a slightly different version of a for loop than you may have seen before.

## Get object keys:

```javascript
var vehicle = {
 "year" : 2018,
 "make" : "Toyota",
 "model" : "Sienna"
};

for (var key in vehicle) {
 gs.info('key=' + key + ' value=' + vehicle[key]);
}
```
