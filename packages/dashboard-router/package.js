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
  api.use('kadira:flow-router@2.6.2');
  api.use('browserify:path-to-regexp@1.2.1');
  api.addFiles('lib/router.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-router');
});
