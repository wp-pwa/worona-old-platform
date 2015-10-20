Package.describe({
  name: 'worona:dashboard-breadcrumbs',
  version: '1.0.0',
  summary: 'Worona Dashboard Apps Management.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-apps@1.0.0');
  api.addFiles('lib/actions.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-breadcrumbs');
});