let __ = TAPi18n.__;

State.modify('breadcrumbs.items', (state = []) => {
  if (Action.type().startsWith('SHOW_')) {
    let route = _.find(FlowRouter._routesMap, route => {
      if (route.options.type === Action.type()) return true;
    });
    let appId = State.get('app.id');
    if (appId) {
      let url = FlowRouter.path(route.path, { appId });
      return [
        { name: __('Apps'),
          url: State.get('route.apps.url'),
          next: true},
        { name: State.get('app.name'),
          url: '#',
          next: true},
        { name: s.humanize(route.name),
          url,
          next: false}
      ];
    } else {
      return [
        {
          name: 'Worona',
          url: State.get('route.home.url'),
          next: true
        },
        {
          name: s.humanize(route.name),
          url: route.path,
          next: false
        }
      ];
    }
  }
});
