---
title: "The While Loop"
type: "topic"
---

# The While Loop

## 15.1 Simple while loop

```javascript
var i = 0;
while (i < 5) {
 gs.info(i);
 i++;
}
gs.info('done i=' + i);
```

## 15.2 Breaking out of a while loop

```javascript
var i = 0;
while (true) {
 if (i == 5)
   break;
 gs.info(i);
 ++i;
}
gs.info('done');
```

## 15.3 Continue - jumping back to the while condition

```javascript
var i = 0;
var done = false;
while (!done) {
 if (i < 5) {
   ++i;
   gs.info(i + ' done=' + done);
   continue;
 }
 gs.info('I think we are done');
 done = true;
}
gs.info(i);
```
