var handle = Meteor.subscribe('apps-tester');
State.modify('apps.isReady', (state = false) => {
  return (!!handle && handle.ready());
});

State.modify('apps.items', (state = []) => {
  return Apps.find({}, { sort: { modifiedAt: -1 } });
});

State.modify('app', (state = {}) => {
  let appId = State.get('app.id');
  return Apps.findOne(appId);
});

State.modify('app.id', (state = false) => {
  if ((Action.type().startsWith('SHOW_') === true)) {
    if ((Action.params) && (Action.params.appId))
      return Action.params.appId;
    else
      return false;
  }
  return state;
});

State.modify('insertApp', (state = { isValid: true }) => {
  switch (Action.type()) {
    case 'INSERT_APP_FAILED':
      let obj = {};
      _.each(_.allKeys(Action.context), key => {
        if (Match.test(Action.context[key], Function))
          obj[key] = Action.context[key].bind(Action.context);
        // else
        //   obj[key] = Action.context[key];
      });
      let invalidKeys = Action.context.
      return obj;
    default:
      return state;
  }
});

State.modify('insertApp.isOpen', (state = false) => {
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
    case 'NEW_APP_CREATED':
      return false;
    default:
      return state;
  }
});

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'dashboard',
    template: 'appMenuItem',
    order: 10
  });
  return state;
});
