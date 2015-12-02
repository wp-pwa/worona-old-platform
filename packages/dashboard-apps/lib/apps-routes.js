FlowRouter.route('/apps', {
  name: 'Apps',
  type: 'SHOW_APPS',
  layout: 'GeneralScreen',
  content: 'Apps'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (context.path === '/') {
      redirect('/apps');
    }
  }
]);
