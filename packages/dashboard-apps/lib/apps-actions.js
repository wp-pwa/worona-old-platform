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

State.set('CurrentApp', (state = {}) => {
  let appId = State.get('AppId');
  return Apps.findOne(appId);
});

State.set('AppId', (state = false) => {
  if ((Action.type().startsWith('SHOW_') === true) &&
      (Action.params) && (Action.params.AppId))
    return Action.params.AppId;
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
      debugger;
      let name = Action.appName.value;
      let url  = Action.appUrl.value;
      Meteor.call('addNewApp', { name, url });
      break;
  }
});
