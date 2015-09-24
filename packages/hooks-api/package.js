Package.describe({
  name: 'worona:hooks-api',
  version: '1.0.0',
  summary: 'Hooks API for Worona apps. Based on WP Hooks.',
  git: 'https://github.com/worona/worona-app/',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('worona:external-libraries@1.0.0');

  api.addFiles('lib/hooks-api.js');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:hooks-api');
  api.addFiles('tests/actions-tests.js');
  api.addFiles('tests/filters-tests.js');
});
