Package.describe({
  name: 'worona:dashboard-default-state',
  version: '1.0.0',
  summary: 'Worona Dashboard Default State.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.addFiles('lib/default-state.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-default-state');
});
