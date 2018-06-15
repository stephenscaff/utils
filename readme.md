# JavasScript Utils

Just an ongoing collection of JS utils I commonly use on projects.
Initially, this was to aid in my withdraw from Jquery 🤗	

## Organization

The methods are wrapped in an function expression to provide some encapsulation.

So, you access methods like `Util.methodName()`

## Example

```
Util.forEach ( items, function (index, item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    ...
  });
});
```
