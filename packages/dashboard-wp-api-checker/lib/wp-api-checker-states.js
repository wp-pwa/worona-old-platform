State.modify('wpApiChecker.error', (state = false) => {
  switch (Action.type()) {
    case 'WP_API_CHECK_FAILED':
      return true;
    case 'CHECK_WP_API':
    case 'WP_API_CHECK_SUCCEED':
      return false;
    default:
      return state;
  }
});

// Variable to control if the "Connecting" template should be shown or not
// because we don't want to show the "Ouch, connection failed" template the
// first time.
State.modify('wpApiChecker.firstTime', (state = true) => {
  switch (Action.type()) {
    case 'SHOW_WP_API_CHECKER':
      return true;
    case 'WP_API_CHECK_FAILED':
      return false;
    default:
      return state;
  }
});

State.modify('wpApiChecker.changeUrl.isInvalid', (state = false) => {
  if (Action.is('UPDATE_APP_FAILED'))
    return true;
  else if (Action.is('UPDATE_APP_SUCCEED'))
    return false;
  else
    return state;
});

State.modify('wpApiChecker.checking', (state = false) => {
  switch (Action.type()) {
    case 'CHECK_WP_API':
    case 'SHOW_WP_API_CHECKER':
      return true;
    case 'WP_API_CHECK_SUCCEED':
    case 'WP_API_CHECK_FAILED':
      return false;
    default:
      return state;
  }
});
