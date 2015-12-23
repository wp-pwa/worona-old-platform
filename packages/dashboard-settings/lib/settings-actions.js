AfterAction(() => {
  switch (Action.type()) {
    case 'APP_CREATION_SUCCEED':
      Meteor.call('ApplySettings', { appId: Action.app._id });
      break;
    default:

  }
});
