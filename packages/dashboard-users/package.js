Package.describe({
  name: 'worona:dashboard-users',
  version: '1.0.0',
  summary: 'Worona Dashboard Accounts.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');

  api.addFiles('package-tap.i18n', ['client', 'server']);

  api.addFiles('lib/users-publications.js', 'server');
  api.addFiles('lib/users-collections.js', ['client', 'server']);
  api.addFiles('lib/users-actions.js', 'client');
  api.addFiles('lib/users-routes.js', 'client');
  api.addFiles('lib/users-states.js', 'client');

  api.addFiles('templates/login.html', 'client');
  api.addFiles('templates/login.js', 'client');
  api.addFiles('templates/create-your-first-app.html', 'client');
  api.addFiles('templates/create-your-first-app.js', 'client');
  api.addFiles('templates/logout-menu-item.html', 'client');
  api.addFiles('templates/profile-menu-item.html', 'client');
  api.addFiles('templates/profile.html', 'client');

  api.addFiles('i18n/en.i18n.json', ['client', 'server']);
  api.addFiles('i18n/es.i18n.json', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-users');
});
