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
  api.use('worona:dashboard-external-libraries@1.0.0');

  api.addFiles('package-tap.i18n', ['client', 'server']);
  api.addFiles('lib/breadcrumbs-states.js', 'client');
  api.addFiles('templates/breadcrumbs.html', 'client');
  api.addFiles('i18n/en.i18n.json', ['client', 'server']);
  api.addFiles('i18n/es.i18n.json', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-breadcrumbs');
});
