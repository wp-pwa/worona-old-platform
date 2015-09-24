var testTitle = 'worona:hooks-api - Actions: ';

var beforeEach = function () {
  Worona._resetActions();
};

// This is used to create objects which can be executed and spied with the
// prototype pattern.
var StubCreator = function () { this._foo = 0; };
StubCreator.prototype.getFoo = function () { return this._foo; };
StubCreator.prototype.addFoo = function () { this._foo = this._foo + 1; };

// This is used to create objects which can be executed and spied but with
// the module pattern instead.
var newStub = function () {
  var self = { _foo: 0 };
  self.getFoo = function () { return self._foo; };
  self.addFoo = function () { self._foo = self._foo + 1; };
  return self;
};

// TESTS:
Tinytest.add(testTitle +
  'Should run a function  (prototype) added previously using bind',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addAction('something_happened', stub.addFoo.bind(stub));
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 1);
  }
);

Tinytest.add(testTitle +
  'Should run a function  (prototype) twice using bind',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addAction('something_happened', stub.addFoo.bind(stub));
    Worona.doAction('something_happened');
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 2);
  }
);

Tinytest.add(testTitle +
  'Should run a function  (prototype) added previously using array',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addAction('something_happened', [stub, 'addFoo']);
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 1);
  }
);

Tinytest.add(testTitle +
  'Should run a function  (prototype) twice using array',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addAction('something_happened', [stub, 'addFoo']);
    Worona.doAction('something_happened');
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 2);
  }
);

Tinytest.add(testTitle +
  'Should run a function  (module) added previously',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addAction('something_happened', stub.addFoo);
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 1);
  }
);

Tinytest.add(testTitle +
  'Should run a function  (module) twice',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addAction('something_happened', stub.addFoo);
    Worona.doAction('something_happened');
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 2);
  }
);

Tinytest.add(testTitle +
  'Should reset function s using helper',

  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addAction('something_happened', stub.addFoo.bind(stub));
    Worona._resetActions();
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 0);
  }
);

Tinytest.add(testTitle +
  'Should run first a function  with higher priority than 10',
  function (test) {
    beforeEach();

    var text = '';
    var stub1 = function () { text = text + '1'; };
    var stub2 = function () { text = text + '2'; };

    Worona.addAction('something_happened', stub1, 9);
    Worona.addAction('something_happened', stub2);
    Worona.doAction('something_happened');

    test.equal(text, '12');
  }
);

Tinytest.add(testTitle +
  'Should run last a function  with lower priority than 10',

  function (test) {
    beforeEach();

    var text = '';
    var stub1 = function () { text = text + '1'; };
    var stub2 = function () { text = text + '2'; };

    Worona.addAction('something_happened', stub1, 11);
    Worona.addAction('something_happened', stub2);
    Worona.doAction('something_happened');

    test.equal(text, '21');
  }
);

Tinytest.add(testTitle +
  'Should remove a function  added previously',

  function (test) {
    beforeEach();

    var flag = false;
    var stub = function () { flag = true; };

    Worona.addAction('something_happened', stub);
    Worona.removeAction('something_happened', stub);
    Worona.doAction('something_happened');

    test.equal(flag, false);
  }
);

Tinytest.add(testTitle +
  'Should remove a function  (module) added previously',

  function (test) {
    beforeEach();

    var stub = newStub();

    Worona.addAction('something_happened', stub.addFoo);
    Worona.removeAction('something_happened', stub.addFoo);
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 0);
  }
);

Tinytest.add(testTitle +
  'Should remove a function  (prototype) added previously using array',
  function (test) {
    beforeEach();

    var stub = new StubCreator();

    Worona.addAction('something_happened', [stub, 'addFoo']);
    Worona.removeAction('something_happened', [stub, 'addFoo']);
    Worona.doAction('something_happened');

    test.equal(stub.getFoo(), 0);
  }
);

Tinytest.add(testTitle +
  'It should not remove a function (prototype) of different instance',
  function (test) {
    beforeEach();

    var stub1 = new StubCreator();
    var stub2 = new StubCreator();

    Worona.addAction('something_happened', [stub1, 'addFoo']);
    Worona.removeAction('something_happened', [stub2, 'addFoo']);
    Worona.doAction('something_happened');

    test.equal(stub1.getFoo(), 1);
  }
);

Tinytest.add(testTitle +
  'Process functions (prototype) with args',

  function (test) {
    beforeEach();

    var number = 0;
    var stub = function (x, y) { number = y + 1; };

    Worona.addAction('something_happened', stub);
    Worona.doAction('something_happened', 0, 2);

    test.equal(number, 3);
  }
);

Tinytest.add(testTitle +
  'Check first arg doesn\'t change while runing several hooks',

  function (test) {
    beforeEach();

    var number = 1;
    var stub = function (x) {
      number = number + x;
      return number;
    };

    Worona.addAction('something_happened', stub);
    Worona.addAction('something_happened', stub);
    Worona.doAction('something_happened', 1);

    // Number should be 0 at the beginning, then 1+1=2 in the first stub
    // execution, then 2+1=3 in the second execution.
    test.equal(number, 3);
  }
);
