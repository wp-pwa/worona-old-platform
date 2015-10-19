Package.describe({
  name: 'worona:external-libraries',
  version: '1.0.0',
  summary: 'External libraries for Worona App and Worona Dashboard.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2');

  // External libraries used by Worona App and Worona Dashboard.
  var packages = [
    'check',
    'tracker',
    'underscore',
    'ecmascript',
    'mongo',
    'reactive-var',
    'accounts-password@1.1.3',
    'underscorestring:underscore.string@3.2.2',
    'tap:i18n@1.7.0',
    'meteorflux:dispatcher@1.1.1',
    'meteorflux:dispatcher-helper@1.0.1',
    'meteorflux:appstate@1.1.0'
  ];

  // Imply them so they are accesible anywhere in the app or the dashboard.
  api.imply(packages);

  api.addFiles('lib/namespace.js'); // Add the Worona namespace.
  api.export('Worona');             // Export the Worona namespace.
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('worona:external-libraries');
  api.addFiles('tests/namespace-tests.js');
});
