FluxRouter.redirection(action => {
  if ((action.type.startsWith('SHOW_') && (!Meteor.userId()))) {
    return 'SHOW_LOGIN';
  }
});

FluxRouter.redirection(action => {
  if ((action.type === 'SHOW_LOGIN') && (Meteor.userId())) {
    return 'SHOW_CREATE_YOUR_FIRST_APP';
  }
});
