let handle = null;
Tracker.autorun(() => {
  if (Meteor.userId())
    handle = Meteor.subscribe('UserApps');
  else if (handle)
    handle.stop();
});

State.set('Apps.isReady', (state = false) => {
  return !!handle && handle.ready();
});

State.set('Apps.items', (state = []) => {
  return Apps.find({}, { sort: { modifiedAt: -1 } });
});

State.set('App', (state = {}) => {
  let appId = State.get('AppId');
  return Apps.findOne(appId);
});

State.set('AppId', (state = false) => {
  if ((Action.type().startsWith('SHOW_') === true)) {
    if ((Action.params) && (Action.params.AppId))
      return Action.params.AppId;
    else
      return false;
  }
  return state;
});

State.set('IsNewAppForm', (state = false) => {
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

First(() => {
  switch (Action.type()) {
    case 'NEW_APP_CREATED':
      Meteor.call('addNewApp', Action.payload());
      break;
    case 'APP_CHANGED':
      let id = State.get('AppId');
      let data = {};
      if (Action.appUrl)
        data.url = Action.appUrl.value;
      if (Action.appName)
        data.name = Action.appName.value;
      Meteor.call('changeApp', id, data);
      break;
  }
});
