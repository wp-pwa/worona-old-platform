
var dashboard = FlowRouter.group({
  name: 'dashboard',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      AppState.set('redirectAfterLogin', FlowRouter.current().path);
      redirect(AppState.get('loginUrl'));
    }
  }]
});

FlowRouter.route(AppState.get('loginUrl'), {
  action: function() {
    Dispatcher.dispatch('SHOW_LOGIN');
  },
  triggersEnter: function(context, redirect) {
    if (Meteor.userId()) {
      redirect(AppState.get('redirectAfterLogin'));
    }
  }
});

FlowRouter.route(AppState.get('createYourFirstAppUrl'), {
  action: function() {
    Dispatcher.dispatch('SHOW_CREATE_YOUR_FIRST_APP');
  }
});

dashboard.route(AppState.get('homeUrl'), {
  action: function() {
    Dispatcher.dispatch('SHOW_HOME');
  },
});

dashboard.route(AppState.get('profileUrl'), {
  action: function() {
    Dispatcher.dispatch('SHOW_PROFILE');
  },
});

dashboard.route('/app/:id', {
  triggersEnter: [function(context, redirect) {
    redirect(context.path + '/general-settings');
  },],
});

dashboard.route('/app/:id/general-settings', {
  action: function(params) {
    Dispatcher.dispatch('SHOW_APP_GENERAL_SETTINGS', { id: params.id });
  },
});
