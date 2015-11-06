Package.describe({
  name: 'worona:dashboard-router',
  version: '1.0.0',
  summary: 'Worona Dashboard Router.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('templating');
  api.use('kadira:flow-router@2.8.0');
  api.imply('kadira:flow-router@2.8.0');
  api.addFiles('lib/dashboard-router.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-router');
});
