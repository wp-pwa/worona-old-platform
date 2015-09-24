// Stores on Worona are similar to Stores on Facebook Flux. This is a class
// to help you build them.
Worona.Store = class Store {

  // The helpers method is used to create template helpers right from the
  // Stores. The first argument is the parent category of the helper (string)
  // and the second argument is an object containing helper functions. For
  // example running helpers('author', { name() => ..., bio() => ... }) will
  // give access to {{author.name}} and {{author.bio}} in the Templates.
  helpers(helperName, helpersList) {
    var self = this;
    check(helperName, String);
    check(helpersList, Object);

    if (Worona.Store._helpersBuffer[helperName] === undefined) {
      Worona.Store._helpersBuffer[helperName] = { };
    }

    _.extend(Worona.Store._helpersBuffer[helperName], helpersList);

    Template.registerHelper(
      helperName,
      Worona.Store._helpersBuffer[helperName]
    );

    _.extend(self, helpersList);
  }

  helper(helperName, helperFunction) {
    var self = this;
    check(helperName, String);
    check(helperFunction, Function);
    check(helperFunction(), Object); // Check that the function returns an obj.

    // Check if a previous function has been assigned to this helper
    // name.
    if (Match.test(Blaze._globalHelpers[helperName], Function)) {
      helperFunction = (function () {
        var oldFunction = Blaze._globalHelpers[helperName];
        var newFunction = helperFunction;
        return function () {
          var oldResult = oldFunction();
          var newResult = newFunction();
          return _.extend(oldResult, newResult);
        };
      })();
    }

    Template.registerHelper(helperName, helperFunction);

    _.extend(self[helperName], helperFunction);

  }

  actions(actionsList) {
    var self = this;

    _.extend(self.actions, actionsList);

    self.tokenId = Worona.register(function (payload) {
      var actionType = payload.actionType;
      if (_.has(self.actions, actionType)) {
        var params = _.omit(payload, 'actionType');
        var func = self.actions[actionType];
        func = _.bind(func, self);
        func(params);
      }
    });
  }
};

Worona.Store._helpersBuffer = { };
