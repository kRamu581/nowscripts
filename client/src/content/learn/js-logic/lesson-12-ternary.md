---
title: "The Ternary Operator"
type: "topic"
---

# The Ternary Operator

How to create a short method of the if/else statement.

## Could have written:

```javascript
var valveOpen = true;
var openStatusString;

if (valveOpen)
 openStatusString = 'open';
else
 openStatusString = 'closed';

gs.info('1: Valve is currently ' + openStatusString);
```

## Introducing a shortcut way (the ternary operator):

```javascript
var openStatusString = (valveOpen) ? 'open' : 'closed';
gs.info('2: Valve is currently ' + openStatusString);
```
