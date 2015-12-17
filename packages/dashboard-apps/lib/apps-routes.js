FlowRouter.route('/apps', {
  name: 'apps',
  type: 'SHOW_APPS',
  layout: 'generalLayout'
});

FlowRouter.route('/app/:appId', {
  name: 'app',
  type: 'SHOW_APP',
  layout: 'appLayout'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (context.path === '/') {
      redirect('/apps');
    }
  }
]);
