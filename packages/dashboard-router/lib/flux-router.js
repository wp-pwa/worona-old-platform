MeteorFlux.FluxRouter = class FluxRouter {
  constructor() {
    let self = this;

    self._routes = {};
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

      // Create RouteUrl. For example, HomeUrl or LoginUrl.
      let stateUrl = route + 'Url';
      AppState.set(stateUrl, item.path);

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

      // Save regexp to check every time a click is sent.
      let re = self._pathToRegexp(item.path);
      item.regexp = re;

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
                    let paramNames = [];
                    self._pathToRegexp(item.path, paramNames);
                    paramNames = _.pluck(paramNames, "name");
                    let paramValues = _.rest(re.exec(dest));
                    let params = _.object(paramNames, paramValues);
                    Dispatcher.dispatch(item.action, { params });
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
          Dispatcher.dispatch(self._routes[route].action, { params });
        }
      });
    });
  }

  routes(newRoutes) {
    let self = this;
    self._updateRoutes(newRoutes);
  }
};

FluxRouter = new MeteorFlux.FluxRouter();
