// Add your routes here. For each route, some things get registered.
// For example, for route SomePlace with path /some-place:
// - a 'isSomePlace' helper (true or false).
// - a 'SomePlaceUrl' helper with '/some-place' url.
// - an action 'SHOW_SOME_PLACE' dispatched when '/some-place' is visited.
let routes = {
  Home: '/',
  Login: '/login',
  Profile: '/profile',
  CreateYourFirstApp: '/create-your-first-app'
};

// Get action type for route. For example, SHOW_HOME for Home or
// SHOW_CREATE_YOUR_FIRST_APP for CreateYourFirstApp.
let getActionType = function(route) {
  route = s.replaceAll(route, ':.+?/', '_');
  route = s.replaceAll(route, '/', '');
  route = 'SHOW_' + s.humanize(route).toUpperCase();
  return s.replaceAll(route, ' ', '_');
};


// Register all the stuff needed for each route.
for (var route in routes) {
  let actionType = getActionType(route);

  // Create state for urls. For example, HomeUrl or LoginUrl
  let stateUrl = route + 'Url';
  let url = routes[route];
  AppState.set(stateUrl, url);

  // Create state for is. For example, isHome or isLogin
  let isState = 'is' + route;
  AppState.modify(isState, (action, state = false) => {
    return action.type.startsWith(actionType) ? true : false;
  });

  // Dispatch an action when the actionType is visited.
  FlowRouter.route(url, {
    action(params) {
      Dispatcher.dispatch(actionType, params);
    }
  });
}

// Create trigger to send people to login if they aren't logged.
FlowRouter.triggers.enter([
  (context, redirect) => {
    if (!Meteor.userId()) {
      AppState.set('redirectAfterLogin', FlowRouter.current().path);
      redirect(AppState.get('loginUrl'));
    }
  }
]);

// Redirect to general settings when seeing an app.
FlowRouter.route('/app/:id', {
  triggersEnter: [function(context, redirect) {
    redirect(context.path + '/general-settings');
  }]
});
