Package.describe({
  name: 'worona:dashboard-debug',
  version: '1.0.0',
  summary: 'Debug things for dashboard.',
  git: 'https://github.com/worona/worona/',
  documentation: null,
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('babrahams:constellation@0.1.11');
  api.addFiles('dashboard-debug.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
});
