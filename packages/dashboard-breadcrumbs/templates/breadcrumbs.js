let __ = TAPi18n.__;

Template.Breadcrumbs.onCreated(() => {
  let text = Template.instance().data.text;
  State.modify('Breadcrumbs.items', (state = []) => {
    return [
      { Name: __('Apps'),
        Url: '/',
        NextBreadcrumb: true},
      { Name: State.get('App.name'),
        Url: State.get('App.url'),
        NextBreadcrumb: true},
      { Name: text,
        Url: '#',
        NextBreadcrumb: false}
    ];
  });
});
