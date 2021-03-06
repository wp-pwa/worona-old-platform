Package.describe({
  name: 'worona:app-base',
  version: '1.0.0',
  summary: 'Worona App Base Package. Adding this should get you going.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function (api) {

  api.versionsFrom('1.2');

  // Those are the base packages which are included by default.
  // They should be only packages which are essential and can't be taken away.
  // If they are not essential, they shouldn't be here.
  var packages = [
    'worona:external-libraries@1.0.0', // no deps
    'worona:app-external-libraries@1.0.0', // no deps
  ];

  // Imply them so they are available in the rest of the Worona App.
  api.imply(packages);

});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('worona:app-base');
});
