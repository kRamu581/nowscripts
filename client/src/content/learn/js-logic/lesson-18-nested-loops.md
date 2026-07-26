---
title: "Nested Loops"
type: "topic"
---

# Nested Loops

Explains and demonstrates how to use a loop within a loop. While this example shows two for loops, any loop can be placed inside another. However, there are some considerations to take when using nested loops.

```javascript
for (var i = 0; i < 5; i++) {
 for (var j = 0; j < 3; j++) {
   gs.info('i=' + i + ' j=' + j);
 }
}

gs.info('Done i=' + i + ' j=' + j);
```
