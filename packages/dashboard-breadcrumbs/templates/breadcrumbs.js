let __ = TAPi18n.__;

Template.breadcrumb.onCreated(() => {
  let text = Template.instance().data.text;
  State.modify('breadcrumbs.items', (state = []) => {
    return [
      { Name: __('Apps'),
        Url: '/',
        NextBreadcrumb: true},
      { Name: State.get('app.name'),
        Url: State.get('app.url'),
        NextBreadcrumb: true},
      { Name: text,
        Url: '#',
        NextBreadcrumb: false}
    ];
  });
});
