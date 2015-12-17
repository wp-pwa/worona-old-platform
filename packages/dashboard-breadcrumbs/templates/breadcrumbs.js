let __ = TAPi18n.__;

Template.breadcrumb.onCreated(() => {
  let text = Template.instance().data.text;
  let path = State.get('route.generalSettings.url');
  let appId = State.get('app._id');
  let url = FlowRouter.path(path, { appId });
  State.modify('breadcrumbs.items', (state = []) => {
    return [
      { name: __('Apps'),
        url: State.get('route.home.url'),
        next: true},
      { name: State.get('app.name'),
        url,
        next: true},
      { name: text,
        url: '#',
        next: false}
    ];
  });
});
