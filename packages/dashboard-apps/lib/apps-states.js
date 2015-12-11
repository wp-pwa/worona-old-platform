var handle = Meteor.subscribe('apps-tester');
State.modify('apps.isReady', (state = false) => {
  return (!!handle && handle.ready());
});

State.modify('apps.items', (state = []) => {
  return Apps.find({}, { sort: { modifiedAt: -1 } });
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

State.modify('app', (state = {}) => {
  let appId = State.get('app.id');
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return new App();
    default:
      return appId ? Apps.findOne(appId) : state;
  }
});

State.modify('apps.isNewAppFormOpen', (state = false) => {
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
      return false;
    case 'NEW_APP_CREATED':
      return State.get('app.hasValidationErrors');
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
