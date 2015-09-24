Package.describe({
  name: 'worona:flux-api',
  version: '1.0.0',
  summary: 'Flux API for Worona apps. Based on MeteorFlux Dispatcher.',
  git: 'https://github.com/worona/worona-app/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('worona:external-libraries@1.0.0');
  api.use('meteorflux:dispatcher@1.0.0');

  api.addFiles('lib/dispatcher.js');
  api.addFiles('lib/store.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('blaze-html-templates');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:flux-api');
  api.addFiles('tests/dispatcher-tests.js');

  // api.addFiles([
  //   'tests/store-tests.js',
  //   'tests/store-tests.html'
  // ], 'client');
});
