Worona.AppState = class AppState {
  constructor() {
    this._state  = new ReactiveObj();
  }

  // Private function to save the data generated from a function. We need this
  // because we store the returned values, not the function itself. To check if
  // the values have changed, we use a Tracker autorun. Once we have the values,
  // we use _setObject to store the object generated.
  _setFunction(state, func) {
    let self = this;
    check(state, Array);
    check(func, Function);

    Tracker.autorun(() => {
      let result = func();
      self._setObject(state, result);
    });
  }

  // Private function to save the data from an object. We need this method
  // because if we are adding an object and a previous object has been assigned
  // we want to merge both.
  _setObject(state, object) {
    let self = this;
    check(state, Array);

    let previousData = self._state.get(state);
    if (Match.test(previousData, Object)) {
      object = _.extend(previousData, object);
    }
    self._state.set(state, object);
  }


  // Private function to create a global helper which just returns the value of
  // the ReactiveObj.
  _registerHelper(state) {
    let self = this;
    check(state, String);

    Template.registerHelper(state, () => {
      return self._state.get(state);
    });
  }

  // This methods accepts a string with point quotation and some data to save
  // inside. The string can be pretty much anything, like for example
  // 'author', 'author.name', 'flatui-theme.settings.isActive'...
  // Data can be pretty much anything as well. Strings, Numbers, Booleans,
  // even complex Objects, or Functions returning objects or arrays.
  set(state, data) {
    let self = this;
    check(state, String);

    // Extract the state hierarchy in array form.
    let stateArray = state.split('.');

    // If data is a Function, we need to create an autorun and store the
    // function results in the ReactiveObj.
    if (Match.test(data, Function)) {
      self._setFunction(stateArray, data);

    // If data is an Object, we need to extend it with the previous object
    // (if any).
    } else if (Match.test(data, Object)) {
      self._setObject(stateArray, data);

    // If data is String, Number or Boolean we just store it in the
    // ReactiveObj.
    } else {
      self._state.set(stateArray, data);
    }

    // Create the global helper.
    self._registerHelper(stateArray[0]);
  }

  // Returns a variable or object, depending on what has been stored for that
  // state. State can be a String like 'author' or 'author.name' or an Array
  // like ['author'] or ['author', 'name'].
  get(state) {
    let self = this;
    check(state, String);

    // Extract the state hierarchy in array form.
    let stateArray = state.split('.');

    // After that, we just have to return what's inside the ReactiveObj.
    let result = self._state.get(stateArray);

    if ((Match.test(result, Object)) && (result.fetch !== undefined)) {
      return result.fetch();
    } else {
      return result;
    }
  }
};

// We create a new instance and asign its methods to the final Worona namespace.
// We have to bind them so they use the correct class this, instead of Worona's.
var appState = new Worona.AppState();
Worona.set = appState.set.bind(appState);
Worona.get = appState.get.bind(appState);
