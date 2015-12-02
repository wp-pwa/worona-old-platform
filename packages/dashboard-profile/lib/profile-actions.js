let handle = Meteor.subscribe('UserProfile');

State.modify('Profile.isReady', (state = false) => {
  return !!handle && handle.ready();
});

State.modify('Profile', (state = {}) => {
  return Meteor.users.findOne(Meteor.userId());
});

Register(() => {
  switch (Action.type()) {
    case 'PROFILE_CHANGED':
      Meteor.call('changeProfile', Action.payload());
      break;
  }
});
