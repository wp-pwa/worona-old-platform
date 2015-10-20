// Helper to display the New App Form.
AppState.modify('IsNewAppForm', (action, state = false) => {
  switch (action.type) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
    case 'NEW_APP_CREATED':
      return false;
    default:
      return state;
  }
});

AppState.modify('AppId', (action, state = false) => {
  if ((action.type.startsWith('SHOW_')) && (action.params)) {
    return action.params.AppId || false;
  }
  return state;
});

// Add new app.
Dispatcher.register(action => {
  switch (action.type) {
    case 'NEW_APP_CREATED':
      let name = action.appName || action.event.currentTarget.appName.value;
      let url  = action.appUrl || action.event.currentTarget.appUrl.value;
      Meteor.call('addNewApp', { name, url });
      break;
  }
});
