// Create trigger to send people to login if they aren't logged.
FlowRouter.triggers.enter([
  (context, redirect) => {
    if (!Meteor.userId()) {
      Dispatcher.dispatch('SHOW_LOGIN');
    }
  }
], { except: ['Login'] });

// Create trigger to send people to login if they aren't logged.
FlowRouter.triggers.enter([
  (context, redirect) => {
    if (Meteor.userId()) {
      Dispatcher.dispatch('SHOW_CREATE_YOUR_FIRST_APP');
    }
  }
], { only: ['Login'] });
