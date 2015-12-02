// Create ComposeUrl helper. For example:
// {{ComposeUrl path=GeneralScreen appId=_id}}
Template.registerHelper('ComposeUrl', function(params) {
  check(params, Spacebars.kw);
  check(params.hash, Match.ObjectIncluding({ path: String }));
  let pathDef = FlowRouter._routesMap[params.hash.path].pathDef;
  return FlowRouter.path(pathDef, _.omit(params.hash, 'path'));
});

FlowRouter.onRouteRegister(function(route) {
  let name = route.name;
  let helper = route.options.helper;
  let type = route.options.type;
  let pathDef = route.pathDef;
  let layout = route.options.layout;
  let content = route.options.content;

  // Create Route.is helpers. For example, Route.is.Home or Route.is.Login.
  State.modify('Route.is.' + name, (state = false) => {
    if (Action.is(type))
      return true;
    else if (Action.type().startsWith('SHOW_'))
      return false;
    else
      return state;
  });

  // Create Route.XX.url helpers. For example, Route.Home.url or Route.Apps.url
  State.modify('Route.' + name + '.url', (state = '') => {
    return pathDef;
  });

  // Dispatch the action if it is not dispatched.
  FlowRouter._routesMap[name]._action = () => {
    if (!Dispatch.isDispatching()) {
      Dispatch(type, { params: FlowRouter.current().params });
    }
  };

  // Change the url if the action is dispatched.
  Register(() => {
    if (Action.is(type)) {
      if (Action.params) {
        let pathWithParams = FlowRouter.path(pathDef, Action.params);
        FlowRouter.go(pathWithParams);
      } else {
        FlowRouter.go(pathDef);
      }
      BlazeLayout.render(layout, { content });
    }
  });
});
