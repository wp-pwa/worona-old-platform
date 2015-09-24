var beforeEach = function() {
  var appState = new Worona.AppState();
  Worona.set = appState.set.bind(appState);
  Worona.get = appState.get.bind(appState);
  Blaze._globalHelpers = [];
};

Tinytest.add(
  'worona:state-api - If the state is undefined it returns undefined',

  function(test) {
    beforeEach();
    test.equal(Worona.get('undefined'), undefined);
    test.equal(Blaze.toHTML(Template.undefinedTemplate),
      'Variable is false.'
    );
  }
);

Tinytest.add(
  'worona:state-api - If state is undefined returns undefined even if nested',

  function(test) {
    beforeEach();
    test.equal(Worona.get('nested.undefined'), undefined);
    test.equal(Blaze.toHTML(Template.nestedUndefinedTemplate),
      'Variable is false.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get strings',

  function(test) {
    beforeEach();
    Worona.set('string', 'I am a string');
    test.equal(Worona.get('string'), 'I am a string');
    test.equal(Blaze.toHTML(Template.stringTemplate),
      'I am a string inside a template.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get nested strings',

  function(test) {
    beforeEach();
    Worona.set('nested.string', 'I am a nested string');
    test.equal(Worona.get('nested.string'), 'I am a nested string');
    test.equal(Blaze.toHTML(Template.nestedStringTemplate),
      'I am a nested string inside a template.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get strings reactively',

  function(test) {
    beforeEach();
    var text = '';
    Tracker.autorun(function(){
      text = Worona.get('string');
    });
    Worona.set('string', 'I am a string');
    Tracker.flush();
    test.equal(text, 'I am a string');
    test.equal(Blaze.toHTML(Template.stringTemplate),
      'I am a string inside a template.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get nested strings reactively',

  function(test) {
    beforeEach();
    var text = '';
    Tracker.autorun(function(){
      text = Worona.get('nested.string');
    });
    Worona.set('nested.string', 'I am a nested string');
    Tracker.flush();
    test.equal(text, 'I am a nested string');
    test.equal(Blaze.toHTML(Template.nestedStringTemplate),
      'I am a nested string inside a template.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get numbers',

  function(test) {
    beforeEach();
    Worona.set('number', 123);
    test.equal(Worona.get('number'), 123);
    test.equal(Blaze.toHTML(Template.numberTemplate),
      'This is 123.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get numbers reactively',

  function(test) {
    beforeEach();
    var number = '';
    Tracker.autorun(function(){
      number = Worona.get('number');
    });
    Worona.set('number', 123);
    Tracker.flush();
    test.equal(number, 123);
    test.equal(Blaze.toHTML(Template.numberTemplate),
      'This is 123.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get booleans',

  function(test) {
    beforeEach();
    Worona.set('boolean', true);
    test.equal(Worona.get('boolean'), true);
    test.equal(Blaze.toHTML(Template.booleanTemplate),
      'This is true.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get booleans reactively',

  function(test) {
    beforeEach();
    var boolean = '';
    Tracker.autorun(function(){
      boolean = Worona.get('boolean');
    });
    Worona.set('boolean', true);
    Tracker.flush();
    test.equal(boolean, true);
    test.equal(Blaze.toHTML(Template.booleanTemplate),
      'This is true.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get objects',

  function(test) {
    beforeEach();
    Worona.set('author', { name: 'John' });
    var author = Worona.get('author');
    test.equal(author.name, 'John');
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Blaze.toHTML(Template.authorTemplate),
      'His name is John.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate2),
      'His name is John.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get objects in nested templates',

  function(test) {
    beforeEach();
    Worona.set('author', { name: 'John' });
    test.equal(Blaze.toHTML(Template.authorNestedTemplate),
      'His name is John.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get objects reactively',

  function(test) {
    beforeEach();
    var author, authorName;
    Tracker.autorun(function(){
      author = Worona.get('author');
    });
    Tracker.autorun(function(){
      authorName = Worona.get('author.name');
    });
    Worona.set('author', { name: 'John' });
    Tracker.flush();
    test.equal(author.name, 'John');
    test.equal(authorName, 'John');
    test.equal(Blaze.toHTML(Template.authorTemplate),
      'His name is John.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate2),
      'His name is John.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get functions',

  function(test) {
    beforeEach();
    Worona.set('author', function(){
      return { name: 'John' };
    });
    var author = Worona.get('author');
    test.equal(author.name, 'John');
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Blaze.toHTML(Template.authorTemplate),
      'His name is John.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate2),
      'His name is John.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get functions reactively',

  function(test) {
    beforeEach();
    var author, name;
    Tracker.autorun(function(){
      author = Worona.get('author');
    });
    Tracker.autorun(function(){
      name = Worona.get('author.name');
    });
    Worona.set('author', function(){
      return { name: 'John' };
    });
    Tracker.flush();
    test.equal(author.name, 'John');
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Blaze.toHTML(Template.authorTemplate),
      'His name is John.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate2),
      'His name is John.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get combined objects',

  function(test) {
    beforeEach();
    Worona.set('author', { name: 'John' });
    Worona.set('author', { age: 12 });
    var author = Worona.get('author');
    test.equal(author.name, 'John');
    test.equal(author.age, 12);
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Worona.get('author.age'), 12);
    test.equal(Blaze.toHTML(Template.authorTemplate3),
      'His name is John and his age is 12.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate4),
      'His name is John and his age is 12.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get combined objects reactively',

  function(test) {
    beforeEach();
    var author, age, name;
    Tracker.autorun(function(){
      author = Worona.get('author');
    });
    Tracker.autorun(function(){
      name = Worona.get('author.name');
    });
    Tracker.autorun(function(){
      age = Worona.get('author.age');
    });
    Worona.set('author', { name: 'John' });
    Worona.set('author', { age: 12 });
    Tracker.flush();
    test.equal(author.name, 'John');
    test.equal(author.age, 12);
    test.equal(name, 'John');
    test.equal(age, 12);
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Worona.get('author.age'), 12);
    test.equal(Blaze.toHTML(Template.authorTemplate3),
      'His name is John and his age is 12.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate4),
      'His name is John and his age is 12.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get combined objects and data',

  function(test) {
    beforeEach();
    Worona.set('author', { name: 'John' });
    Worona.set('author.age', 12);
    var author = Worona.get('author');
    test.equal(author.name, 'John');
    test.equal(author.age, 12);
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Worona.get('author.age'), 12);
    test.equal(Blaze.toHTML(Template.authorTemplate3),
      'His name is John and his age is 12.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate4),
      'His name is John and his age is 12.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get combined functions',

  function(test) {
    beforeEach();
    Worona.set('author', function(){
      return { name: 'John' };
    });
    Worona.set('author', function(){
      return { age: 12 };
    });
    var author = Worona.get('author');
    test.equal(author.name, 'John');
    test.equal(author.age, 12);
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Worona.get('author.age'), 12);
    test.equal(Blaze.toHTML(Template.authorTemplate3),
      'His name is John and his age is 12.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate4),
      'His name is John and his age is 12.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get combined functions with data',

  function(test) {
    beforeEach();
    Worona.set('author', function(){
      return { name: 'John' };
    });
    Worona.set('author.age', 12);
    var author = Worona.get('author');
    test.equal(author.name, 'John');
    test.equal(author.age, 12);
    test.equal(Worona.get('author.name'), 'John');
    test.equal(Worona.get('author.age'), 12);
    test.equal(Blaze.toHTML(Template.authorTemplate3),
      'His name is John and his age is 12.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate4),
      'His name is John and his age is 12.'
    );
  }
);


Tinytest.add(
  'worona:state-api - We can set and get deep functions',

  function(test) {
    beforeEach();
    Worona.set('post.author', function(){
      return { name: 'John' };
    });
    var post = Worona.get('post');
    test.equal(post.author.name, 'John');
    test.equal(Worona.get('post.author.name'), 'John');
    test.equal(Blaze.toHTML(Template.authorTemplate5),
      'His name is John.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate6),
      'His name is John.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get deep combined functions',

  function(test) {
    beforeEach();
    Worona.set('post', function(){
      return { author: { name: 'John' } };
    });
    Worona.set('post.author', function(){
      return { age: 12 };
    });
    var post = Worona.get('post');
    test.equal(post.author.name, 'John');
    test.equal(post.author.age, 12);
    test.equal(Worona.get('post.author.name'), 'John');
    test.equal(Worona.get('post.author.age'), 12 );
    test.equal(Blaze.toHTML(Template.authorTemplate7),
      'His name is John and his age is 12.'
    );
    test.equal(Blaze.toHTML(Template.authorTemplate8),
      'His name is John and his age is 12.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set and get arrays',

  function(test) {
    beforeEach();
    Worona.set('posts', [ { title: 'Post 1'}, { title: 'Post 2'} ]);
    var posts = Worona.get('posts');
    test.equal(posts[0].title, 'Post 1');
    test.equal(posts[1].title, 'Post 2');
    test.equal(Blaze.toHTML(Template.postTemplate1),
      'Post title is Post 1. Post title is Post 2. '
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set different fields on objects',

  function(test) {
    beforeEach();
    Worona.set('post', {
      title: 'Post 1',
      url: 'http://blog.com'
    });
    Worona.set('post.isReady', true);
    var post = Worona.get('post');
    test.equal(post.title, 'Post 1');
    test.equal(post.url, 'http://blog.com');
    test.equal(post.isReady, true);
    test.equal(Blaze.toHTML(Template.postTemplate2),
      'Post title is Post 1 and url is http://blog.com.'
    );
    test.equal(Blaze.toHTML(Template.postTemplate3),
      'Post title is Post 1 and url is http://blog.com.'
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set different fields on cursors',

  function(test) {
    beforeEach();

    Posts = new Mongo.Collection(null);
    Posts.insert({ title: 'Post 1', url: 'http://blog.com' });
    Posts.insert({ title: 'Post 2', url: 'http://blog2.com' });

    Worona.set('posts', () => {
      return Posts.find();
    });
    Worona.set('posts.isReady', true);

    var posts = Worona.get('posts');
    test.equal(posts[0].title, 'Post 1');
    test.equal(posts[0].url, 'http://blog.com');
    test.equal(posts[1].title, 'Post 2');
    test.equal(posts[1].url, 'http://blog2.com');
    test.equal(Worona.get('posts.isReady'), true);
    test.equal(Blaze.toHTML(Template.postTemplate4),
      'Post title is Post 1 and url is http://blog.com. ' +
      'Post title is Post 2 and url is http://blog2.com. '
    );
  }
);

Tinytest.add(
  'worona:state-api - We can set different fields on cursors reactively',

  function(test) {
    beforeEach();

    var posts;
    Tracker.autorun(() => {
      posts = Worona.get('posts');
    });

    Posts = new Mongo.Collection(null);
    Posts.insert({ title: 'Post 1', url: 'http://blog.com' });
    Posts.insert({ title: 'Post 2', url: 'http://blog2.com' });

    Worona.set('posts', () => {
      return Posts.find();
    });
    Worona.set('posts.isReady', true);
    Tracker.flush();

    test.equal(posts[0].title, 'Post 1');
    test.equal(posts[0].url, 'http://blog.com');
    test.equal(posts[1].title, 'Post 2');
    test.equal(posts[1].url, 'http://blog2.com');
    test.equal(Worona.get('posts.isReady'), true);
    test.equal(Blaze.toHTML(Template.postTemplate4),
      'Post title is Post 1 and url is http://blog.com. ' +
      'Post title is Post 2 and url is http://blog2.com. '
    );
  }
);
