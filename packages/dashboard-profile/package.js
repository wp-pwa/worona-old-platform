Package.describe({
  name: 'worona:dashboard-profile',
  version: '1.0.0',
  summary: 'Worona Dashboard Profile.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');

  api.addFiles('package-tap.i18n', ['client', 'server']);
  api.addFiles('lib/profile-collections.js', ['client', 'server']);
  api.addFiles('lib/profile-publications.js', 'server');
  api.addFiles('lib/profile-methods.js', ['client', 'server']);
  api.addFiles('lib/profile-actions.js', 'client');
  api.addFiles('lib/profile-states.js', 'client');
  api.addFiles('lib/profile-routes.js', 'client');
  api.addFiles('templates/profile.html', 'client');
  api.addFiles('templates/profile-menu-item.html', 'client');
  api.addFiles('i18n/en.i18n.json', ['client', 'server']);
  api.addFiles('i18n/es.i18n.json', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-profile');
});
