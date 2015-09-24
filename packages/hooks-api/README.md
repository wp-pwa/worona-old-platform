# Worona Hooks API (WHAPI)

### What is Worona?

[Worona](https://www.worona.org/) is an open source platform to turn WordPress sites into mobile applications.

### What is this Hooks API?

These hooks are part of the Worona API. They work like [WordPress hooks](http://codex.wordpress.org/Plugin_API) but designed for Worona. Thanks to them, Worona code is extensible and other people can create new functionalities.

There are two kinds of hooks: **actions** and **filters**.

### What are Actions?

The simplest definition is this: Actions indicate that something has happened.

> Actions are events dispatched when certain things have occurred - certain resources are loaded, certain facilities are available, and, depending on how early the action has occurred, some things have yet to load.

This means that you have the ability to execute code when something happens.

For example:
```javascript
var myFunction = function() {
  alert('Hey, a post is going to be loaded in the app!');
};
Worona.addAction("before_post_load", myFunction);
```

Whenever a post is loaded (mostly because the user has clicked somewhere), your function will be executed.

Actions can pass parameters as well. For example `'before_post_load'` will pass the post data:
```javascript
var myFunction = function(post) {
  alert('A post with title ' + post.title + ' is going to be loaded!');
};
Worona.addAction("before_post_load", myFunction);
```

You can also create your own **actions**. If you do, other people will be able to execute functions when your code is running:

```javascript
Worona.doAction("myplugin_did_something", someData);
```

### What are filters?

Filters, on the other hand, are different to actions. They are dispatched at similar points; however, what they do is different: you can modify data.

> Filters are functions that Worona passes data through. They are primarily responsible for intercepting, managing, and returning data before rendering it or saving data to the database.

For example, this function adds an exclamation point right after each post title:

```javascript
var myFunction = function(postData) {
  postData.title   = postData.title + "!";
  return postData;
};
Worona.addFilter('post_data', myFunction);
```

You can also create your own **filters**. If you do, other people will be able to modify your data before you save or write it:

```javascript
Worona.doFilter("myplugin_modify_my_data", myData);
```
