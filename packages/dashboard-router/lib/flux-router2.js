FlowRouter.onRouteRegister(function(route) {
  let name = route.name;
  let helper = route.options.helper;
  let type = route.options.type;
  let pathDef = route.pathDef;

  // Create IsRoute helpers. For example, IsHome or IsLogin.
  AppState.modify(helper, (action, state = false) => {
    if (action.type.startsWith('SHOW_') === true)
      return action.type === type ? true : false;
    else
      return state;
  });

  // Dispatch the action if it is not dispatched
  FlowRouter._routesMap[name]._action = () => {
    if (!Dispatcher.isDispatching())
      Dispatcher.dispatch(type, {
        path: FlowRouter.current().path,
        pathDef: pathDef,
        params: FlowRouter.current().params
      });
  };

  // Change the url if the action is dispatched
  Dispatcher.register(action => {
    if (action.type === type) {
      if (action.path) {
        FlowRouter.go(action.path);
      }
      else if (action.params) {
        let pathWithParams = FlowRouter.path(pathDef, action.params);
        FlowRouter.go(pathWithParams);
      } else {
        FlowRouter.go(path);
      }
    }
  });
});


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
