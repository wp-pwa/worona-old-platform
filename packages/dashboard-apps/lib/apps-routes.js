FlowRouter.route('/apps', {
  name: 'apps',
  type: 'SHOW_APPS',
  layout: 'generalLayout'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (context.path === '/') {
      redirect('/apps');
    }
  }
]);
