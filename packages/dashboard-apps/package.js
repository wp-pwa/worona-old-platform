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
  api.addFiles('lib/collections.js', ['client', 'server']);
  api.addFiles('lib/publications.js', 'server');
  api.addFiles('lib/subscriptions.js', 'client');
  api.addFiles('lib/methods.js', ['client', 'server']);
  api.addFiles('lib/actions.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-apps');
});
