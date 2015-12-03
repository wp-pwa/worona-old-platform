Register(() => {
  switch (Action.type()) {
    case 'PROFILE_CHANGED':
      Meteor.call('changeProfile', Action.payload());
      break;
  }
});
