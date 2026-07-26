---
title: "Array forEach"
type: "topic"
---

# Array forEach

This lesson demonstrates a unique way to create a loop using an array with the forEach method.

## forEach with external function:

```javascript
var list = [1, 3, 5];
list.forEach(myFunction);

function myFunction(item, i) {
 gs.info('myFunction item=' + item + ' i=' + i);
}
```

## Embedded forEach:

```javascript
var list = [1, 3, 5];

list.forEach(function (item) {
 gs.info('embedded function item=' + item);
});
```

## Also returning the entire array:

```javascript
var list = ['apple', 'banana', 'orange'];

list.forEach(function (item, index, arr) {
 gs.info('embedded function item=' + item + ' index=' + index + ' arr=' + arr);
});
```
