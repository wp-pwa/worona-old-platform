// Add your routes here. For each route, some things get registered.
// For example, for route SomePlace with path /some-place:
// - 'IsSomePlace' helper (true or false).
// - 'SomePlaceUrl' helper with '/some-place' url.
// - Action 'SHOW_SOME_PLACE' dispatched when '/some-place' is visited.
let routes = {
  Home: '/',
  Login: '/login',
  Profile: '/profile',
  CreateYourFirstApp: '/create-your-first-app'
};



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Function to get an action type for a route. For example, SHOW_HOME for Home
// or SHOW_CREATE_YOUR_FIRST_APP for CreateYourFirstApp.
let getActionType = function(route) {
  route = s.replaceAll(route, ':.+?/', '_');
  route = s.replaceAll(route, '/', '');
  route = 'SHOW_' + s.humanize(route).toUpperCase();
  return s.replaceAll(route, ' ', '_');
};

// Loop to register all the stuff needed for each route.
for (var route in routes) {
  let actionType = getActionType(route);

  // Create urls. For example, HomeUrl or LoginUrl.
  let stateUrl = route + 'Url';
  let url = routes[route];
  AppState.set(stateUrl, url);

  // Create is helpers. For example, IsHome or IsLogin.
  let isState = 'Is' + route;
  AppState.modify(isState, (action, state = false) => {
    if (action.type.startsWith('SHOW_')) {
      return action.type === actionType ? true : false;
    }
    return state;
  });

  // Dispatch an action when the actionType is visited.
  FlowRouter.route(url, {
    name: route,
    action(params, queryParams) {
      Dispatcher.dispatch(actionType, { params, queryParams });
    }
  });
}

// Create trigger to send people to login if they aren't logged.
FlowRouter.triggers.enter([
  (context, redirect) => {
    if (!Meteor.userId()) {
      redirect(AppState.get('LoginUrl'));
    }
  }
], { except: ['Login'] });

// Create a trigger to set a PreviousUrl to be used in things like redirects
// or analytics.
FlowRouter.triggers.enter([
  (context, redirect) => {
    if (context && context.oldRoute)
      AppState.set('PreviousRoute', {
        url: context.oldRoute.path,
        name: context.oldRoute.name
      });
  }
]);

// Redirect to general settings when seeing an app.
FlowRouter.route('/app/:id', {
  triggersEnter: [function(context, redirect) {
    redirect(context.path + '/general-settings');
  }]
});
