Package.describe({
  name: 'worona:dashboard-settings',
  version: '1.0.0',
  summary: 'Worona Dashboard Settings Management.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');

  api.addFiles('lib/settings-collections.js', ['client', 'server']);
  api.addFiles('lib/settings-publications.js', 'server');
  api.addFiles('lib/settings-methods.js', ['client', 'server']);
  api.addFiles('lib/settings-actions.js', 'client');
  api.addFiles('lib/settings-states.js', 'client');
  api.addFiles('lib/settings-routes.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-settings');
});
