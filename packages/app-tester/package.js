Package.describe({
  name: 'worona:app-tester',
  version: '1.0.0',
  summary: '',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.addFiles('app-tester.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:app-tester');
  api.addFiles('app-tester-tests.js');
});
