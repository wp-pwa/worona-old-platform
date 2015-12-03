Package.describe({
  name: 'worona:dashboard-general-settings',
  version: '1.0.0',
  summary: 'Worona General Settings Extension.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');

  api.addFiles('package-tap.i18n', ['client', 'server']);
  api.addFiles('lib/general-settings-routes.js', 'client');
  api.addFiles('lib/general-settings-states.js', 'client');
  api.addFiles('templates/general-settings.html', 'client');
  api.addFiles('templates/general-settings-menu-item.html', 'client');
  api.addFiles('i18n/en.i18n.json', ['client', 'server']);
  api.addFiles('i18n/es.i18n.json', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-general-settings');
});
