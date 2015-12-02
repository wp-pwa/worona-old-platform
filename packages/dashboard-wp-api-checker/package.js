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
  api.use('worona:dashboard-external-libraries@1.0.0');
  api.use('browserify:wordpress-rest-api@0.5.0');

  api.addFiles('package-tap.i18n', ['client', 'server']);
  api.addFiles('lib/wp-api-checker-routes.js', 'client');
  api.addFiles('lib/wp-api-checker-actions.js', 'client');
  api.addFiles('lib/wp-api-checker-states.js', 'client');
  api.addFiles('templates/wp-api-checker.html', 'client');
  api.addFiles('templates/wp-api-checker.js', 'client');
  api.addFiles('templates/wp-api-checker.css', 'client');
  api.addFiles('templates/throbber.css', 'client');
  api.addFiles('i18n/en.i18n.json', 'client');
  api.addFiles('i18n/es.i18n.json', 'client');

  api.addAssets('images/activate-worona.png', 'client');
  api.addAssets('images/install-worona.png', 'client');
  api.addAssets('images/search.png', 'client');
  api.addAssets('images/wodpress-plugins.png', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-wp-api-checker');
});
