var testTitle = 'worona:hooks-api - Filters: ';

var beforeEach = function () {
  Worona._resetFilters();
};

// This is used to create objects which can be executed and spied with the
// prototype pattern.
var StubCreator = function () { this._foo = 10; };
StubCreator.prototype.modifyX = function (x) {
  check(x, Number);
  return x + 1;
};
StubCreator.prototype.modifyWithFoo = function (x) {
  check(x, Number);
  return this._foo + x;
};

// This is used to create objects which can be executed and spied but with
// the module pattern instead.
var newStub = function () {
  var self = { };
  self.modifyX = function (x) { return x + 1; };
  return self;
};

// TESTS:
Tinytest.add(testTitle +
  'Filters: Should run a function (prototype) added previously',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addFilter('something_happened', stub.modifyX);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 1);
  }
);

Tinytest.add(testTitle +
  'Filters: Should run a function (prototype) twice',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addFilter('something_happened', stub.modifyX);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 2);
  }
);

Tinytest.add(testTitle +
  'Filters: Should run a function (prototype) using array',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addFilter('something_happened', [stub, 'modifyWithFoo']);

    var bar = 3;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 13);
  }
);

Tinytest.add(testTitle +
  'Filters: Should run a function (prototype) twice using array',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addFilter('something_happened', [stub, 'modifyWithFoo']);

    var bar = 3;
    bar = Worona.doFilter('something_happened', bar);
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 23);
  }
);

Tinytest.add(testTitle +
  'Filters: Should run a function (module) added previously',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addFilter('something_happened', stub.modifyX);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 1);
  }
);

Tinytest.add(testTitle +
  'Filters: Should run a function (module) twice',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addFilter('something_happened', stub.modifyX);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 2);
  }
);

Tinytest.add(testTitle +
  'Filters: Should reset functions using helper',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addFilter('something_happened', stub.modifyX);
    Worona._resetFilters();

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 0);
  }
);

Tinytest.add(testTitle +
  'Filters: Should run first a function with higher priority than 10',

  function (test) {
    beforeEach();

    var stub1 = function (x) { return x + '1'; };
    var stub2 = function (x) { return x + '2'; };

    Worona.addFilter('something_happened_2', stub1, 9);
    Worona.addFilter('something_happened_2', stub2);

    var bar = '';
    bar = Worona.doFilter('something_happened_2', bar);

    test.equal(bar, '12');
  }
);

Tinytest.add(testTitle +
  'Filters: Should run last a function with lower priority than 10',

  function (test) {
    beforeEach();

    var stub1 = function (x) { return x + '1'; };
    var stub2 = function (x) { return x + '2'; };

    Worona.addFilter('something_happened', stub1, 11);
    Worona.addFilter('something_happened', stub2);

    var bar = '';
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, '21');
  }
);

Tinytest.add(testTitle +
  'Filters: Should remove a function added previously',

  function (test) {
    beforeEach();

    var stub = function (x) { return x + 1; };

    Worona.addFilter('something_happened', stub);
    Worona.removeFilter('something_happened', stub);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 0);
  }
);

Tinytest.add(testTitle +
  'Filters: Should remove a function (module) added previously',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addFilter('something_happened', stub.modifyX);
    Worona.removeFilter('something_happened', stub.modifyX);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 0);
  }
);

Tinytest.add(testTitle +
  'Filters: Should remove a function (prototype) using array',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addFilter('something_happened', [stub, 'modifyWithFoo']);
    Worona.removeFilter('something_happened', [stub, 'modifyWithFoo']);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 0);
  }
);

Tinytest.add(testTitle +
  'Filters: It should not remove a function (prototype) of different instance',

  function (test) {
    beforeEach();

    var stub1 = new StubCreator();
    var stub2 = new StubCreator();

    Worona.addFilter('something_happened', [stub1, 'modifyWithFoo']);
    Worona.removeFilter('something_happened', [stub2, 'modifyWithFoo']);

    var bar = 0;
    bar = Worona.doFilter('something_happened', bar);

    test.equal(bar, 10);
  }
);
