let WP = Browserify['wordpress-rest-api'];

let checkWpApi = function(url) {
  console.log(url);
  let wp = new WP({ endpoint: url + '/wp-json' });
  // Callbacks
  wp.posts().then(function( data ) {
    Dispatch('WP_API_CHECK_SUCCEED', { data })
      .then('SHOW_GENERAL_SETTINGS', { params: { AppId: State.get('AppId') }} );
  }).catch(function( error ) {
    Dispatch('WP_API_CHECK_FAILED', { error });
  });
};

Finally(() => {
  if (Action.is('SHOW_WP_API_CHECKER')) {
    // Use tracker to wait until CurrentApp is set. It can be delayed because
    // if the page is accessed directly, the Apps subscription may not be ready.
    Tracker.autorun(c => {
      let url = State.get('CurrentApp.url');
      if (url) {
        checkWpApi(url);
        c.stop();
      }
    });
  }
});
