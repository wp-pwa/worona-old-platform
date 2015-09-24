Package.describe({
  name: 'worona:state-api',
  version: '1.0.0',
  summary: 'App State API for Worona apps.',
  git: 'https://github.com/worona/worona-app/',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('xamfoo:reactive-obj');
  api.use('blaze-html-templates');
  api.addFiles('lib/client/state-api.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('blaze-html-templates');
  api.use('mongo');
  api.use('worona:state-api');
  api.addFiles('tests/client/state-api-tests.js', 'client');
  api.addFiles('tests/client/state-api-tests.html', 'client');
});
