// Create trigger to send people to login if they aren't logged.
// FlowRouter.triggers.enter([
//   (context, redirect) => {
//     if (!Meteor.userId()) {
//       Dispatcher.dispatch('SHOW_LOGIN');
//     }
//   }
// ], { except: ['Login'] });

FluxRouter.redirection(action => {
  if ((action.type.startsWith('SHOW_') && (!Meteor.userId()))) {
    return 'SHOW_LOGIN';
  }
});

FluxRouter.redirection(action => {
  switch (action.type) {
    case 'SHOW_LOGIN':
      if (Meteor.userId())
        return 'SHOW_CREATE_YOUR_FIRST_APP';
      break;
  }
});
