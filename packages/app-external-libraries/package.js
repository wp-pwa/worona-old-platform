Package.describe({
  name: 'worona:app-external-libraries',
  version: '1.0.0',
  summary: 'Worona App External Libraries.',
  git: 'https://github.com/worona/worona-app/',
  documentation: 'README.md'
});

Package.onUse(function (api) {

  api.versionsFrom('1.1.0.3');

  // External packages needed for Worona App (but not Worona Dashboard).
  var packages = [];

  // Imply them so they are accesible anywhere in the app.
  api.imply(packages);

});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('worona:app-external-libraries');
});
