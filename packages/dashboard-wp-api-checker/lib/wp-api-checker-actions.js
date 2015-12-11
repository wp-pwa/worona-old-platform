let WP = Browserify['wordpress-rest-api'];

let checkWpApi = function(url) {
  let wp = new WP({ endpoint: url + '/wp-json' });
  wp.posts().filter('posts_per_page', 1)
    .then(function(data) {
      setTimeout(() => {
        Dispatch('WP_API_CHECK_SUCCEED', { data })
        .then('SHOW_GENERAL_SETTINGS', {
          params: { appId: State.get('app.id') }
        });
      }, 1000);
    })
    .catch(function(error) {
      setTimeout(() => {
        Dispatch('WP_API_CHECK_FAILED', { error });
      }, 1000);
    });
};

AfterAction(() => {
  switch (Action.type()) {
    case 'SHOW_WP_API_CHECKER':
      // Use tracker to wait until App is set. It can be delayed because
      // if the page is accessed directly, Apps subscription may not be ready.
      Tracker.autorun(c => {
        let url = State.get('app.url');
        if (url) {
          checkWpApi(url);
          c.stop();
        }
      });
      break;
    case 'CHECK_WP_API':
      let url = State.get('app.url');
      checkWpApi(url);
      break;
  }
});
