// Add your routes here.
const routes = {
  Home: {
    path: '/',
    action: 'SHOW_HOME',
    helper: 'IsHome'
  },
  Login: {
    path: '/login',
    action: 'SHOW_LOGIN',
    helper: 'IsLogin'
  },
  Profile: {
    path: '/profile',
    action: 'SHOW_PROFILE',
    helper: 'IsProfile'
  },
  CreateYourFirstApp: {
    path: '/create-your-first-app',
    action: 'SHOW_CREATE_YOUR_FIRST_APP',
    helper: 'IsCreateYourFirstApp'
  },
  AppGeneralSettings: {
    path: '/app/:id/general-settings',
    action: 'SHOW_APP_GENERAL_SETTINGS',
    helper: 'IsGeneralSettings'
  }
};



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Import path-to-regexp and create object to store them.
const pathToRegexp = Browserify['path-to-regexp'];

// Loop to register all the stuff needed for each route.
for (var route in routes) {

  let item = routes[route];

  // Create urls. For example, HomeUrl or LoginUrl.
  let stateUrl = route + 'Url';
  AppState.set(stateUrl, item.path);

  // Create is helpers. For example, IsHome or IsLogin.
  AppState.modify(item.helper, (action, state = false) => {
    if (action.type.startsWith('SHOW_')) {
      return action.type === item.action ? true : false;
    }
    return state;
  });

  // Register the route.
  FlowRouter.route(item.path, {
    name: route
  });

  // Create callback to change url
  Dispatcher.register(action => {
    if (action.type === item.action) {
      FlowRouter.go(item.path);
    }
  });

  // Save regexp to check every time a click is sent.
  let re = pathToRegexp(item.path);
  item.regexp = re;
}

// Dispatch the first router action when loaded
Meteor.startup(() => {
  let route = FlowRouter.current().route.name;
  // Dispatcher.dispatch(routes[route].action);
});

for (var t in Template) {
  if (Template.hasOwnProperty(t)) {
    var tmpl = Template[t];
    if (Blaze.isTemplate(tmpl)) {
      tmpl.events({
        'click a[href]'(event) {

          // If actionType is defined, don't do anything.
          if (event.currentTarget.dataset.actionType) return;

          // If not, let's see if it's external link or internal link.
          let dest = s.strRight(event.currentTarget.href, location.host);
          if (dest.startsWith('/')) {
            // Internal link, let's dispatch an action.

            // Check which regexp is used
            for (var route in routes) {
              let item = routes[route];
              let re = item.regexp;
              if (re.test(dest)){
                console.log(re.exec(dest));
                debugger;
                // Dispatcher.dispatch(item.action);
                event.preventDefault();
                event.stopImmediatePropagation();
              }
            }
          }
        }
      });
    }
  }
}


// Create trigger to send people to login if they aren't logged.
FlowRouter.triggers.enter([
  (context, redirect) => {
    if (!Meteor.userId()) {
      Dispatcher.dispatch('SHOW_LOGIN');
    }
  }
], { except: ['Login'] });


// // Redirect to general settings when seeing an app.
// FlowRouter.route('/app/:id', {
//   triggersEnter: [function(context, redirect) {
//     redirect(context.path + '/general-settings');
//   }]
// });
