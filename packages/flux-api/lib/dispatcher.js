// The Dispatcher of Worona is quite similar to the MeteorFlux Dispatcher but
// including actionType in the first parameter of the Dispatcher.
Worona.Dispatcher = class Dispatcher {
  constructor() {
    // We create an internal MeteorFlux Dispatcher.
    this._dispatcher = new MeteorFlux.Dispatcher();
  }

  // Worona Dispatcher takes the actionType in the first parameter. Then it
  // includes it in the payload and sends a regular MeteorFlux dispatch.
  dispatch(actionType, payload = { }) {
    check(actionType, String);

    payload.actionType = actionType;
    this._dispatcher.dispatch(payload);

    console.log('Action: ' + actionType + '.  ', _.omit(payload, 'actionType'));
  }

  // The register method is just like the MeteorFlux register method but it
  // accepts the actionType in the first argument instead of the payload.
  register(actionType, func) {
    check(actionType, String);
    check(func, Function);

    var funcWithActionType = function(payload) {
      if (payload.actionType === actionType) {
        func(payload);
      }
    };

    this._dispatcher.register(funcWithActionType);
  }
};

// Finally we create an instance and use bind to assign its methods to Worona.
// We do this because in Flux, you only need one Dispatcher. The `waitFor`
// method is not used in Worona.
var dispatcher = new Worona.Dispatcher();
Worona.dispatch = dispatcher.dispatch.bind(dispatcher);
Worona.register = dispatcher.register.bind(dispatcher);
