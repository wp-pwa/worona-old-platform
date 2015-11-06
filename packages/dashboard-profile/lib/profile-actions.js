let handle = Meteor.subscribe('UserProfile');

State.set('Profile.isReady', (state = false) => {
  return !!handle && handle.ready();
});

State.set('Profile', (state = {}) => {
  return Meteor.users.findOne(Meteor.userId());
});

First(() => {
  switch (Action.type()) {
    case 'PROFILE_CHANGED':
      Meteor.call('changeProfile', Action.payload());
      break;
  }
});
