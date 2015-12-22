Package.describe({
  name: 'worona:dashboard-external-libraries',
  version: '1.0.0',
  summary: 'Worona Dashboard External Libraries.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md'
});

Package.onUse(function (api) {

  api.versionsFrom('1.2');

  // External packages needed for Worona Dashboard (but not Worona App).
  var packages = [
    'worona:dashboard-router@1.0.0',
    'worona:dashboard-i18n@1.0.0',
    'jagi:astronomy@1.2.6',
    'jagi:astronomy-timestamp-behavior@1.1.0',
    'jagi:astronomy-validators@1.1.2',
    'ongoworks:security@1.3.0',
    'meteorflux:blaze-utils@1.0.0'
  ];

  // Imply them so they are accesible anywhere in the dashboard.
  api.imply(packages);

});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('worona:dashboard-external-libraries');
});
