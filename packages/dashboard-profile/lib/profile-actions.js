// If user is logged in. Let's do stuff.
let handleUserProfile = Meteor.subscribe('UserProfile', () => {
  // Dispatcher.dispatch('USER_PROFILE_SUBSCRIPTION_READY');
});

Tracker.autorun(() => {
  if (handleUserProfile.ready()) {
    console.log("ready");
    debugger;
    // Dispatcher.dispatch('USER_PROFILE_SUBSCRIPTION_READY');
  } else {
    // Dispatcher.dispatch('USER_PROFILE_SUBSCRIPTION_NOT_READY');
  }
});

AppState.modify('Profile.isReady', (action, state = false) => {
  switch (action.type) {
    case 'USER_PROFILE_SUBSCRIPTION_READY':
      return true;
    case 'USER_PROFILE_SUBSCRIPTION_NOT_READY':
      return false;
    default:
      return state;
  }
});

AppState.modify('Profile', (action, state = {}) => {
  switch (action.type) {
    case 'PROFILE_CHANGED':
      Meteor.call('changeProfile', _.omit(action, 'type'));
      return Meteor.users.findOne(Meteor.userId());
    case 'USER_PROFILE_SUBSCRIPTION_READY':
      return Meteor.users.findOne(Meteor.userId());
    default:
      return state;
  }
});
