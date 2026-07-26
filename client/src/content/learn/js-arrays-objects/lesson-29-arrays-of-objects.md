---
title: "Arrays of Objects"
type: "topic"
---

# Arrays of Objects

This lesson combines the lessons on arrays AND objects to create arrays OF objects and why they are so useful.

```javascript
var bookList = [
// This is an array containing 3 objects; each object has 2 properties
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

var len = bookList.length; // Tells us: how many books are in the library.

gs.info('Last author=' + bookList[len - 1].author); // ‘len - 1’ because len is 3 but array numbering start at 0 and stops at 2

for (var i = 0; i < len; i++) {
 var book = bookList[i];
 gs.info(i + ' - Title: ' + book.title + ' - Author: ' + book.author);
}
```
