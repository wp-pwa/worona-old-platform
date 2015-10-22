let checkWpApi = function(app) {
  console.log('wp would do: ' + app.url);
  // We use defer so we are sure AppState is up to date.
  Meteor.defer(() => {
    console.log('wp would do: ' + app.url);
  });
};

Dispatcher.register(action => {
  switch (action.type) {
    case 'SHOW_WP_API_CHECKER':
      // console.log(action.params.AppId);
      let app = Apps.findOne(action.params.AppId);
      console.log('params.AppId', action.params.AppId);
      console.log('Apps.findOne', app);
      console.log('Appstate', AppState.get('CurrentApp'));
      // checkWpApi(app);
      break;
  }
});
