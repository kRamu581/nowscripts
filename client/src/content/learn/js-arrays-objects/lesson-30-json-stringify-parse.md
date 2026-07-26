---
title: "JSON Stringify and Parse"
type: "topic"
---

# JSON Stringify and Parse

Lesson 30 introduces `JSON.stringify()` and `JSON.parse()` to translate objects to strings and back again. Watch the video to find out why this is such a powerful JavaScript feature.

## 30.1 Stringify and Parse

```javascript
var bookList = [
 {
   "title" : "Harry Potter and the Chamber of Secrets",
   "author" : "J.K. Rowling"
 },
 {
   "title" : "Moby Dick",
   "author" : "Herman Melville"
 },
 {
   "title" : "A Tale of Two Cities",
   "author" : "Charles Dickens"
 }
];
gs.info(bookList); 
```

**Output:**
```text
/// *** Script: [object Object],[object Object],[object Object]
// That's not very helpful
```

```javascript
var bookListStr = JSON.stringify(bookList);
gs.info(bookListStr);
```

**Output:**
```javascript
// *** Script: [{"title":"Harry Potter and the Chamber of Secrets","author":"J.K. Rowling"},{"title":"Moby Dick","author":"Herman Melville"},{"title":"A Tale of Two Cities","author":"Charles Dickens"}]
// I can read it - sort of.
```

```javascript
var bookListStrFormat = JSON.stringify(bookList, null, 4);
gs.info(bookListStrFormat);
```

**Output:**
```javascript
//* *** Script: [
 {
   "title": "Harry Potter and the Chamber of Secrets",
   "author": "J.K. Rowling"
 },
 {
   "title": "Moby Dick",
   "author": "Herman Melville"
 },
 {
   "title": "A Tale of Two Cities",
   "author": "Charles Dickens"
 }
] */
// Ah - that's better!
```

## 30.2 Parse example

```javascript
var libraryStr = '[{"title":"Harry Potter and the Chamber of Secrets","author":"J.K. Rowling"},{"title":"Moby Dick","author":"Herman Melville"},{"title":"A Tale of Two Cities","author":"Charles Dickens"}]';
// Enclose string in single quotes, not double quotes

gs.info('length=' + libraryStr.length);
var libraryObj = JSON.parse(libraryStr);
gs.info('length=' + libraryObj.length);
gs.info(JSON.stringify(libraryObj, null, 4)); // 4 spaces of indentation, see link below
```

**Output:**
```javascript
*** Script: length=186
*** Script: length=3
*** Script: [
 {
   "title": "Harry Potter and the Chamber of Secrets",
   "author": "J.K. Rowling"
 },
 {
   "title": "Moby Dick",
   "author": "Herman Melville"
 },
 {
   "title": "A Tale of Two Cities",
   "author": "Charles Dickens"
 }
]
```
