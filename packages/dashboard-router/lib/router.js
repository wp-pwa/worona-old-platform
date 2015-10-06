FlowRouter.route('/', {
  action: function() {
    Dispatcher.dispatch('SHOW_HOME');
  },
});

FlowRouter.route('/profile', {
  action: function() {
    Dispatcher.dispatch('SHOW_PROFILE');
  },
});

FlowRouter.route('/login-or-sign-up', {
  action: function() {
    Dispatcher.dispatch('SHOW_LOGIN');
  },
});

FlowRouter.route('/app/:id', {
  triggersEnter: [function(context, redirect) {
    redirect(context.path + '/general-settings');
  },],
});

FlowRouter.route('/app/:id/general-settings', {
  action: function(params) {
    Dispatcher.dispatch('SHOW_APP_GENERAL_SETTINGS', { id: params.id });
  },
});
