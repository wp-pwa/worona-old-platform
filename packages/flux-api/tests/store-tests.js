var beforeEach = function () {
  var dispatcher = new Worona.Dispatcher();
  Worona.dispatch = dispatcher.dispatch.bind(dispatcher);
  Worona.register = dispatcher.register.bind(dispatcher);
  Worona.Store._helpersBuffer = { };
  Blaze._globalHelpers = { };
};

Tinytest.add(
  'worona:flux-api - Store: Stores can register actions',

  function (test) {
    beforeEach();
    var text = '';

    var stubStore = new Worona.Store();
    stubStore.actions({
      SOMETHING_HAPPENED() {
        text = text + 'Something has happened';
      }
    });

    Worona.dispatch('SOMETHING_HAPPENED');

    test.equal(text, 'Something has happened');
  }
);

Tinytest.add(
  'worona:flux-api - Store: Stores can register actions with payloads',

  function (test) {
    beforeEach();
    var text = '';

    var stubStore = new Worona.Store();
    stubStore.actions({
      SOMETHING_HAPPENED(payload) {
        text = payload.text + 'Worona';
      }
    });

    Worona.dispatch('SOMETHING_HAPPENED', { text: 'I am using ' });

    test.equal(text, 'I am using Worona');
  }
);

Tinytest.add(
  'worona:flux-api - Store: Stores can register helpers',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helpers('some', {
      thing() {
        return 'Something';
      }
    });

    test.equal(
      Blaze._globalHelpers.some.thing(),
      'Something'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Stores can access their own helpers',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helpers('some', {
      thing() {
        return 'Something';
      },
      other() {
        return 'Other ' + this.thing();
      }
    });

    test.equal(stubStore.thing(), 'Something');
    test.equal(stubStore.other(), 'Other Something');
  }
);

Tinytest.add(
  'worona:flux-api - Store: Different Stores can register helpers',

  function (test) {
    beforeEach();

    var stubStore1 = new Worona.Store();

    stubStore1.helpers('some', {
      thing() {
        return 'Something';
      }
    });

    var stubStore2 = new Worona.Store();
    stubStore2.helpers('some', {
      thingElse() {
        return 'Something else';
      }
    });

    test.equal(
      Blaze._globalHelpers.some.thing(),
      'Something'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Stores can register single helper functions',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();

    test.throws(function () {
      stubStore.helper('some', function () { return 'Something'; });
    });
  }
);

Tinytest.add(
  'worona:flux-api - Store: Stores can register helpers returning objects',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helper('author', function () {
      return {
        name: 'John',
        age: 12
      };
    });

    test.equal(Blaze._globalHelpers.author().name, 'John');
  }
);

Tinytest.add(
  'worona:flux-api - Store: Helpers can render nested objects',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helper('author', function () {
      return {
        name: 'John',
        age: 12
      };
    });

    test.equal(
      Blaze.toHTML(Template.testWithAndNested),
      'This is John. He has 12.'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Helpers can render nested objects with #with',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helper('author', function () {
      return {
        name: 'John',
        age: 12
      };
    });

    test.equal(
      Blaze.toHTML(Template.testWithAndNested),
      'This is John. He has 12.'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Helpers can render helpers with values',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helpers('author', {
      name: 'John',
      age: 12
    });

    test.equal(
      Blaze.toHTML(Template.testWithAndNested),
      'This is John. He has 12.'
    );

    test.equal(
      Blaze.toHTML(Template.testNested),
      'This is John. He has 12.'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Helpers can render helpers with functions',

  function (test) {
    beforeEach();

    var stubStore = new Worona.Store();
    stubStore.helpers('author', {
      name: function () { return 'John'; },
      age: function () { return 12; }
    });

    test.equal(
      Blaze.toHTML(Template.testWithAndNested),
      'This is John. He has 12.'
    );

    test.equal(
      Blaze.toHTML(Template.testNested),
      'This is John. He has 12.'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Helpers can render helpers declared twice',

  function (test) {
    beforeEach();

    var stubStore1 = new Worona.Store();
    stubStore1.helpers('author', {
      name: 'John'
    });

    var stubStore2 = new Worona.Store();
    stubStore2.helpers('author', {
      age: 12
    });

    test.equal(
      Blaze.toHTML(Template.testWithAndNested),
      'This is John. He has 12.'
    );

    test.equal(
      Blaze.toHTML(Template.testNested),
      'This is John. He has 12.'
    );
  }
);

Tinytest.add(
  'worona:flux-api - Store: Helpers can render helper functions declared twice',

  function (test) {
    beforeEach();

    var stubStore1 = new Worona.Store();
    stubStore1.helper('author', function () {
      return {
        name: 'John'
      };
    });

    var stubStore2 = new Worona.Store();
    stubStore2.helper('author', function () {
      return {
        age: 12
      };
    });

    test.equal(
      Blaze.toHTML(Template.testWithAndNested),
      'This is John. He has 12.'
    );

    test.equal(
      Blaze.toHTML(Template.testNested),
      'This is John. He has 12.'
    );
  }
);
