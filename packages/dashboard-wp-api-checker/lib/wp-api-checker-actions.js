let WP = Browserify['wordpress-rest-api'];

let checkWpApi = function(url) {
  let wp = new WP({ endpoint: url + '/wp-json' });
  wp.posts()
    .then(function(data) {
      setTimeout(() => {
        Dispatch('WP_API_CHECK_SUCCEED', { data })
        .then('SHOW_GENERAL_SETTINGS', { params: { AppId: State.get('AppId')}});
      }, 1000);
    })
    .catch(function(error) {
      setTimeout(() => {
        Dispatch('WP_API_CHECK_FAILED', { error });
      }, 1000);
    });
};

State.set('WpApiChecker.error', (state = false) => {
  switch (Action.type()) {
    case 'WP_API_CHECK_FAILED':
      return 'Not working yet. Try again.';
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
State.set('WpApiChecker.firstTime', (state = true) => {
  switch (Action.type()) {
    case 'SHOW_WP_API_CHECKER':
      return true;
    case 'WP_API_CHECK_FAILED':
      return false;
    default:
      return state;
  }
});

State.set('WpApiChecker.checking', (state = false) => {
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

Finally(() => {
  switch (Action.type()) {
    case 'SHOW_WP_API_CHECKER':
      // Use tracker to wait until App is set. It can be delayed because
      // if the page is accessed directly, Apps subscription may not be ready.
      Tracker.autorun(c => {
        let url = State.get('App.url');
        if (url) {
          checkWpApi(url);
          c.stop();
        }
      });
      break;
    case 'CHECK_WP_API':
      let url = State.get('App.url');
      checkWpApi(url);
      break;
  }
});
