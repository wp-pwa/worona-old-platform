let handle = null;
Tracker.autorun(() => {
  if (Meteor.userId())
    handle = Meteor.subscribe('UserApps');
  else if (handle)
    handle.stop();
});

AppState.link('Apps.isReady', () => {
  return !!handle && handle.isReady();
});

Action.run(() => {
  if (Meteor.userId())
    handle = Meteor.subscribe('UserApps');
  else if (handle)
    handle.stop();
  State.set('Apps.isReady', (!!handle && handle.isReady()));
});

AppState.link('Apps.items', () => {
  return Apps.find({}, { sort: { modifiedAt: -1 } });
});

Action.run(() => {
  let apps = Apps.find({}, { sort: { modifiedAt: -1 } });
  State.set('Apps.items', apps);
});

AppState.link('CurrentApp', () => {
  let appId = AppState.get('AppId');
  return Apps.findOne(appId);
});

Action.run(() => {
  let appId = State.get('AppId');
  State.set('CurrentApp', Apps.findOne(appId));
});

AppState.link('AppId', () => {
  FlowRouter.getParam('AppId');
});

Action.run(() => {
  let appId = FlowRouter.getParam('AppId');
  State.set('AppId', appId);
});

State.set('AppId', () => {
  return FlowRouter.getParam('AppId');
});

AppState.modify('IsNewAppForm', (action, state = false) => {
  switch (action.type) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
    case 'NEW_APP_CREATED':
      return false;
    default:
      return state;
  }
});

Action.run(() => {
  switch (Action.get()) {
    case 'OPEN_NEW_APP_FORM':
      State.set('IsNewAppForm', true);
      break;
    case 'CLOSE_NEW_APP_FORM':
    case 'NEW_APP_CREATED':
      State.set('IsNewAppForm', false);
      break;
  }
});

State.set('IsNewAppForm', () => {
  switch (Action.get()) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
    case 'NEW_APP_CREATED':
      return false;
  }
});

AppState.modify('AppId', state => {
  FlowRouter.getParam('AppId');
});

Dispatcher.register(action => {
  switch (action.type) {
    case 'NEW_APP_CREATED':
      let name = action.appName || action.event.currentTarget.appName.value;
      let url  = action.appUrl || action.event.currentTarget.appUrl.value;
      Meteor.call('addNewApp', { name, url });
      break;
  }
});
