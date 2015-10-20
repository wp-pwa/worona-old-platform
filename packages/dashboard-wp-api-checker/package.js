Package.describe({
  name: 'worona:dashboard-wp-api-checker',
  version: '1.0.0',
  summary: 'Worona Dashboard Profile.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-router@1.0.0');
  api.use('templating');

  api.addFiles('package-tap.i18n', ['client', 'server']);

  api.addFiles('lib/routes.js', 'client');
  api.addFiles('lib/actions.js', 'client');
  api.addFiles('lib/wp-api-checker.html', 'client');
  api.addFiles('lib/wp-api-checker.js', 'client');
  api.addFiles('css/throbber.css', 'client');

  api.addFiles([
    'i18n/en.i18n.json',
    'i18n/es.i18n.json',
  ], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-wp-api-checker');
});
