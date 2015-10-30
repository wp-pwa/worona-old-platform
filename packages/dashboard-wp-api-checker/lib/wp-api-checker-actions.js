let checkWpApi = function(app) {
  // use wp-api-rest to check the WP-API
};

Dispatcher.register(action => {
  switch (action.type) {
    case 'SHOW_WP_API_CHECKER':
      let url = await AppState.get('CurrentApp.url');
      checkWpApi(url);
      break;
  }
});
