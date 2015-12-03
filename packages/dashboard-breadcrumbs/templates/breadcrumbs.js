let __ = TAPi18n.__;

Template.breadcrumb.onCreated(() => {
  let text = Template.instance().data.text;
  State.modify('breadcrumbs.items', (state = []) => {
    return [
      { name: __('Apps'),
        url: '/',
        next: true},
      { name: State.get('app.name'),
        url: State.get('app.url'),
        next: true},
      { name: text,
        url: '#',
        next: false}
    ];
  });
});
