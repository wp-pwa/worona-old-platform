Package.describe({
  name: 'worona:dashboard-menus',
  version: '1.0.0',
  summary: 'Worona Dashboard Profile.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.addFiles('lib/menus-collections.js', ['client', 'server']);
  api.addFiles('lib/menus-publications.js', 'server');
  api.addFiles('lib/menus-methods.js', ['client', 'server']);
  api.addFiles('lib/menus-actions.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-menus');
});
