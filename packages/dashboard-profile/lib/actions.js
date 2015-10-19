// If user is logged in. Let's do stuff.
Tracker.autorun(() => {
  if (Meteor.userId()) {
    let handle = Meteor.subscribe('UserProfile');
    AppState.set('Profile.isReady', () => handle.ready());
    AppState.set('Profile', () => Meteor.users.findOne(Meteor.userId()) );
  }
});

Dispatcher.register(action => {
  switch (action.type) {
    case 'PROFILE_CHANGED':
      Meteor.call('changeProfile', _.omit(action, 'type'));
      break;
    default:
  }
});
