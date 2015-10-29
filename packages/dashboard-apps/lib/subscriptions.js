// If user is logged in. Let's subscribe.
let handleUserApps = null;

Tracker.autorun(() => {
  if (Meteor.userId())
    handleUserApps = Meteor.subscribe('UserApps');
  else if (handleUserApps)
    handleUserApps.stop();
});

Tracker.autorun(() => {
  if (!!handleUserApps && handleUserApps.ready()) {
    // Dispatcher.dispatch('USER_APPS_SUBSCRIPTION_READY');
  } else {
    // Dispatcher.dispatch('USER_APPS_SUBSCRIPTION_STOPPED');
  }
});

// Create a helper when the subscription is ready.
// AppState.modify('Apps.isReady', (action, state = false) => {
//   switch (action.type) {
//     case 'USER_APPS_SUBSCRIPTION_READY':
//       return true;
//     case 'USER_APPS_SUBSCRIPTION_STOPPED':
//       return false;
//     default:
//       return state;
//   }
// });

// Observe changes in Apps
let cursorUserApps = Apps.find({}, { sort: { modifiedAt: -1 } });
// cursorUserApps.observe({
//   added()   { Dispatcher.dispatch('USER_APPS_CURSOR_CHANGED'); },
//   changed() { Dispatcher.dispatch('USER_APPS_CURSOR_CHANGED'); },
//   removed() { Dispatcher.dispatch('USER_APPS_CURSOR_CHANGED'); },
//   movedTo() { Dispatcher.dispatch('USER_APPS_CURSOR_CHANGED'); }
// });

AppState.modify('Apps.items', (action, state = []) => {
  if (action.type === 'USER_APPS_CURSOR_CHANGED') {
    return Apps.find({}, { sort: { modifiedAt: -1 } });
  }
});
