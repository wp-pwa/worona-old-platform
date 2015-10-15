
// If user is logged in. Let's do stuff;
Tracker.autorun(() => {
  if (Meteor.userId()) {

    Meteor.subscribe('profile', () => AppState.set('profile.isReady', true));


    AppState.set('profile', () => Meteor.users.findOne(Meteor.userId()) );
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
