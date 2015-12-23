State.modify('app', (state = {}) => {
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return new App();
    default:
      return state;
  }
});

State.modify('apps.isNewAppFormOpen', (state = false) => {
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
      return false;
    default:
      return state;
  }
});

State.modify('apps.items', (state = []) => {
  let arr = [];
  _.each(Settings.find().fetch(), settings => {
    let arrIds = _.pluck(arr, 'appId');
    let i = _.indexOf(arrIds, settings.appId);
    if (i === -1) {
      arr.push({_id: settings.appId});
      i = arr.length - 1;
    }
    arr[i][settings.extension] = _.omit(settings.raw(), [
      '_id', 'appId', 'extension'
    ]);
  });
  return arr;
});

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'dashboard',
    template: 'appMenuItem',
    order: 10
  });
  return state;
});
