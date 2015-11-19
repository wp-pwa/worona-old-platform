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

let cleanUndefinedValues = function(object) {
  let undefineds = _.chain(object)
    .map((v, k) => { if (_.isUndefined(v)) return k; })
    .filter(v => !_.isUndefined(v))
    .value();
  return _.omit(object, undefineds);
};

First(() => {
  let data = {
    name: Action.appName,
    url: Action.appUrl
  };
  data = cleanUndefinedValues(data);
  switch (Action.type()) {
    case 'NEW_APP_CREATED':
      Meteor.call('addNewApp', data);
      break;
    case 'APP_CHANGED':
      let id = State.get('AppId');
      Meteor.call('changeApp', id, data);
      break;
  }
});
