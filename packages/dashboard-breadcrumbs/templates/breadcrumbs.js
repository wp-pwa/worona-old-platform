let __ = TAPi18n.__;

Template.BreadcrumbsTemplate.onRendered(() => {
  let text = Template.instance().data.text;
  State.set('Breadcrumbs.items', [
    { Name: __('Apps'),
      Url: '/',
      NextBreadcrumb: true},
    { Name: State.get('App.name'),
      Url: State.get('App.url'),
      NextBreadcrumb: true},
    { Name: text,
      Url: '#',
      NextBreadcrumb: false}
  ]);
});
