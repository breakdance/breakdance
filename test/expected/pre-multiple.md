```js
var n = 123; // allocates memory for a number
var s = "azerty"; // allocates memory for a string
var o = {
  a: 1,
  b: null
}; // allocates memory for an object and contained values
// (like object) allocates memory for the array and
// contained values
var a = [1, null, "abra"];
function f(a){
  return a + 2;
} // allocates a function (which is a callable object)
// function expressions also allocate an object
someElement.addEventListener('click', function(){
  someElement.style.backgroundColor = 'blue';
}, false);
```

#### Allocation via function calls

Some function calls result in object allocation.

```js
var d = new Date(); // allocates a Date object
var e = document.createElement('div'); // allocates a DOM element
```

Some methods allocate new values or objects:

```js
var s = "azerty";
var s2 = s.substr(0, 3); // s2 is a new string
// Since strings are immutable value,
// JavaScript may decide to not allocate memory,
// but just store the [0, 3] range.
var a = ["ouais ouais", "nan nan"];
var a2 = ["generation", "nan nan"];
var a3 = a.concat(a2);
// new array with 4 elements being
// the concatenation of a and a2 elements
```
