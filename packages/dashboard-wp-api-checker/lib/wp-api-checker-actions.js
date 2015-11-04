let WP = Browserify['wordpress-rest-api'];

let checkWpApi = function(url) {
  console.log(url);
  let wp = new WP({ endpoint: url + '/wp-json' });
  // Callbacks
  wp.posts().then(function( data ) {
    console.log(data);
  }).catch(function( err ) {
    console.log(err);
  });
};

Finally(() => {
  if (Action.is('SHOW_WP_API_CHECKER')) {
    let url = State.get('CurrentApp.url');
    checkWpApi(url);
  }
});
