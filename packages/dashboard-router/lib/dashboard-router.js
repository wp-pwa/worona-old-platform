FlowRouter.onRouteRegister(function(route) {
  let name = route.name;
  let helper = route.options.helper;
  let type = route.options.type;
  let pathDef = route.pathDef;

  // Create IsRoute helpers. For example, IsHome or IsLogin.
  State.set(helper, (state = false) => {
    if (Action.type().startsWith('SHOW_') === true)
      return Action.type() === type ? true : false;
    else
      return state;
  });

  // Create RouteUrl helpers. For example, HomeUrl or LoginUrl.
  let nameUrl = name + 'Url';
  Template.registerHelper(nameUrl, function(params) {
    if (params && params.hash) {
      return FlowRouter.path(pathDef, params.hash);
    }
    return pathDef;
  });

  // Dispatch the action if it is not dispatched.
  FlowRouter._routesMap[name]._action = () => {
    if (!Dispatch.isDispatching()) {
      Dispatch(type, { params: FlowRouter.current().params });
    }
  };

  // Change the url if the action is dispatched.
  First(() => {
    if (Action.is(type)) {
      if (Action.params) {
        let pathWithParams = FlowRouter.path(pathDef, Action.params);
        FlowRouter.go(pathWithParams);
      } else {
        FlowRouter.go(pathDef);
      }
    }
  });
});

// Redirect.
// Dispatcher.addDispatchFilter(function(action) {
//   if ((action.type.startsWith('SHOW_') && (!Meteor.userId()))) {
//     action.type = 'SHOW_LOGIN';
//   }
//   return [action];
// });

FlowRouter.triggers.enter([(context, redirect) => {
  if (!Meteor.userId() && context.path !== '/login') {
    redirect('/login');
  }
}]);

// Dispatcher.addDispatchFilter(function(action) {
//   if ((action.type === 'SHOW_LOGIN') && (Meteor.userId())) {
//     action.type = 'SHOW_CREATE_YOUR_FIRST_APP';
//   }
//   return [action];
// });

FlowRouter.triggers.enter([(context, redirect) => {
  if (Meteor.userId() && context.path === '/login') {
    redirect('/create-your-first-app');
  }
}]);

FlowRouter.route('/', {
  name: 'Home',
  type: 'SHOW_HOME',
  helper: 'IsHome'
});

FlowRouter.route('/profile', {
  name: 'Profile',
  type: 'SHOW_PROFILE',
  helper: 'IsProfile'
});

FlowRouter.route('/login', {
  name: 'Login',
  type: 'SHOW_LOGIN',
  helper: 'IsLogin'
});

FlowRouter.route('/create-your-first-app', {
  name: 'CreateYourFirstApp',
  type: 'SHOW_CREATE_YOUR_FIRST_APP',
  helper: 'IsCreateYourFirstApp'
});

FlowRouter.route('/app/:AppId/general-settings', {
  name: 'AppGeneralSettings',
  type: 'SHOW_APP_GENERAL_SETTINGS',
  helper: 'IsGeneralSettings'
});

FlowRouter.route('/app/:AppId/other-thing', {
  name: 'AppOtherThing',
  type: 'SHOW_APP_OTHER_THING',
  helper: 'IsOtherThing'
});
