var beforeEach = function() {
  var dispatcher = new Worona.Dispatcher();
  Worona.dispatch = dispatcher.dispatch.bind(dispatcher);
  Worona.register = dispatcher.register.bind(dispatcher);
};

Tinytest.add(
  'worona:flux-api - Dispatcher: Worona can register and dispatch',

  function(test) {
    beforeEach();
    var text = 'I am ';
    Worona.register('USER_HAS_DONE_SOMETHING',
      function() { text = text + 'dispatching'; }
    );
    Worona.dispatch('USER_HAS_DONE_SOMETHING');
    test.equal(text, 'I am dispatching');
  }
);

Tinytest.add(
  'worona:flux-api - Dispatcher: Worona can register and dispatch with payload',

  function(test) {
    beforeEach();
    var text = 'I am ';
    Worona.register('USER_HAS_DONE_SOMETHING',
      function(payload) { text = text + payload.text; }
    );
    Worona.dispatch('USER_HAS_DONE_SOMETHING', { text: 'dispatching' });
    test.equal(text, 'I am dispatching');
  }
);
