MeteorFlux.FluxRouter = class FluxRouter {
  constructor() {
    let self = this;

    self._routes = {};
    self._redirections = [];

    self._isChangingUrl = false;
    self._lastUrlUsed = null;
    self._pathToRegexp = Browserify['path-to-regexp'];

    // init
    self._registerTemplateHelpers();
    self._registerUrlChange();
  }

  _updateRoutes(newRoutes) {
    let self = this;

    // Loop to register all the stuff needed for each route.
    for (var route in newRoutes) {

      let item = newRoutes[route];

      // Create IsRoute helpers. For example, IsHome or IsLogin.
      AppState.modify(item.helper, (action, state = false) => {
        if (action.type.startsWith('SHOW_')) {
          return action.type === item.action ? true : false;
        }
        return state;
      });

      // Register the route with FlowRouter.
      FlowRouter.route(item.path, {
        name: route
      });

      // Create callback to change url
      Dispatcher.register(action => {
        if (action.type === item.action) {
          let url = FlowRouter.path(item.path, action.params);
          self._isChangingUrl = true;
          self._lastUrlUsed = url;
          FlowRouter.go(url);
          self._isChangingUrl = false;
        }
      });

      // Save regexp to check every time a click is sent and param names.
      let paramNames = [];
      let re = self._pathToRegexp(item.path, paramNames);
      item.regexp = re;
      item.paramNames = _.pluck(paramNames, "name");

      // Expose param names to AppState
      // _.each(item.paramNames, param => {
      //   Tracker.autorun(() => {
      //     AppState.set(param, FlowRouter.getParam(param));
      //   });
      // });

      // Create RouteUrl. For example, HomeUrl or LoginUrl.
      // If item has params, create a computation.
      let stateUrl = route + 'Url';
      if (item.paramNames.length > 0) {
        Tracker.autorun(() => {
          let params = {};
          _.each(item.paramNames, param => {
            params[param] = AppState.get(param);
          });
          AppState.set(stateUrl, FlowRouter.path(item.path, params));
        });
      } else {
        AppState.set(stateUrl, item.path);
      }

      // Save the item in our internal object.
      self._routes[route] = item;
    }
  }

  _registerTemplateHelpers() {
    let self = this;

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
                for (var route in self._routes) {
                  let item = self._routes[route];
                  let re = item.regexp;
                  if (re.test(dest)){
                    let paramValues = _.rest(re.exec(dest));
                    let params = _.object(item.paramNames, paramValues);
                    let type = item.action;
                    self._dispatchAction({ type, params });
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
  }

  _registerUrlChange() {
    let self = this;

    // Trigger each time the url changes so we can send actions
    Meteor.startup(() => {
      Tracker.autorun(function() {
        FlowRouter.watchPathChange();
        let current = FlowRouter.current();
        if ((current.path !== self._lastUrlUsed) && (!self._isChangingUrl)) {
          self._lastUrlUsed = current.path;
          let route = current.route.name;
          let params = current.params;
          let type = self._routes[route].action;
          self._dispatchAction({ type, params });
        }
      });
    });
  }

  _dispatchAction(action) {
    let self = this;
    for (let func of self._redirections) {
      let actionType = func(action);
      if (actionType) {
        action.type = actionType;
        break;
      }
    }
    Dispatcher.dispatch(action);
  }

  routes(newRoutes) {
    let self = this;
    self._updateRoutes(newRoutes);
  }

  redirection(func) {
    let self = this;
    self._redirections.push(func);
  }
};

FluxRouter = new MeteorFlux.FluxRouter();
