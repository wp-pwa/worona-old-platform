Package.describe({
  name: 'worona:dashboard-apps',
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
  api.addFiles('lib/apps-validators.js', ['client', 'server']);
  api.addFiles('lib/apps-collections.js', ['client', 'server']);
  api.addFiles('lib/apps-publications.js', 'server');
  api.addFiles('lib/apps-methods.js', ['client', 'server']);
  api.addFiles('lib/apps-actions.js', 'client');
  api.addFiles('lib/apps-states.js', 'client');
  api.addFiles('lib/apps-routes.js', 'client');
  api.addFiles('templates/apps.html', 'client');
  api.addFiles('templates/new-app-form.html', 'client');
  api.addFiles('templates/new-app-form.js', 'client');
  api.addFiles('templates/app-card.html', 'client');
  api.addFiles('templates/app-menu-item.html', 'client');
  api.addFiles('i18n/en.i18n.json', ['client', 'server']);
  api.addFiles('i18n/es.i18n.json', ['client', 'server']);

  api.export('Apps');
  api.export('App');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-apps');
});
