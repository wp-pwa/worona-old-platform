Package.describe({
  name: 'worona:dashboard-accounts',
  version: '1.0.0',
  summary: 'Worona Dashboard Accounts.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');

  api.addFiles('lib/accounts-actions.js', 'client');
  api.addFiles('lib/accounts-routes.js', 'client');
  api.addFiles('lib/accounts-states.js', 'client');
  api.addFiles('templates/login.html', 'client');
  api.addFiles('templates/login.js', 'client');
  api.addFiles('templates/create-your-first-app.html', 'client');
  api.addFiles('templates/create-your-first-app.js', 'client');
  api.addFiles('templates/logout-menu-item.html', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-accounts');
});
