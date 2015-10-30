let handle = Meteor.subscribe('UserProfile');

AppState.link('Profile.isReady', () => {
  return !!handle && handle.ready();
});

AppState.link('Profile', () => {
  return Meteor.users.findOne(Meteor.userId());
});

Dispatcher.register(action => {
  switch (action.type) {
    case 'PROFILE_CHANGED':
      Meteor.call('changeProfile', _.omit(action, 'type'));
      break;
  }
});
