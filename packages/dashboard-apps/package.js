Package.describe({
  name: 'worona:dashboard-apps',
  version: '1.0.0',
  summary: 'Worona Dashboard Apps Management.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');
  api.addFiles('lib/apps-collections.js', ['client', 'server']);
  api.addFiles('lib/apps-publications.js', 'server');
  api.addFiles('lib/apps-methods.js', ['client', 'server']);
  api.addFiles('lib/apps-actions.js', 'client');
  api.export('Apps');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-apps');
});
