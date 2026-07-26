---
title: "Try/Catch/Finally Statements"
type: "topic"
---

# Try/Catch/Finally Statements

Lesson 20 shows you how to safeguard your code against rogue errors so it continues to run using the try/catch/finally construct.

## 20.1 Bad script w/o try/catch

```javascript
// for (var i = 0; i < 5; i++) {
 gs.info('i=' + i + ' answer=' + answer);
// }
gs.info('done');
```

## 20.2 Trapping that error

```javascript
try {
 for (var i = 0; i < 5; i++) {
   gs.info('i=' + i + ' answer=' + answer);
 }
} catch (e) {
 gs.error ('Uh-oh ' + e.message); // error output
} // error will also appear in ‘System Logs - All’

gs.info('done');
```

## 20.3 And finally …

```javascript
try {
 for (var i = 0; i < 5; i++) {
   gs.info('i=' + i + ' answer=' + answer);
 }
} catch (e) {
 gs.error('Uh-oh ' + e.message);
} finally {
 gs.info('done');
}
```
