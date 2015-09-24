Package.describe({
  name: 'worona:flux-api',
  version: '1.0.0',
  summary: 'Flux API for Worona apps. Based on MeteorFlux Dispatcher.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('meteorflux:dispatcher@1.0.4');
  api.addFiles('lib/dispatcher.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('blaze-html-templates');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:flux-api');
  api.addFiles('tests/dispatcher-tests.js');
});
