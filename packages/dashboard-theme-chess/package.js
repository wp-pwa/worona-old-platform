Package.describe({
  name: 'worona:dashboard-theme-chess',
  version: '1.0.0',
  summary: 'Theme chess for Worona Dashboard.',
  git: 'https://github.com/worona/worona/',
  documentation: null,
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');
  api.use('worona:dashboard-semantic-ui@1.0.0');
  api.use('worona:menu-helper@1.0.0');

  api.addFiles('package-tap.i18n', ['client', 'server']);
  api.addFiles('lib/theme-chess-routes.js', 'client');
  api.addFiles('templates/chess.html', 'client');
  api.addFiles('templates/chess.css', 'client');
  api.addFiles('templates/header.html', 'client');
  api.addFiles('templates/footer.html', 'client');
  api.addFiles('templates/full-layout.html', 'client');
  api.addFiles('templates/general-layout.html', 'client');
  api.addFiles('templates/general-menu.html', 'client');
  api.addFiles('templates/app-layout.html', 'client');
  api.addFiles('templates/app-menu.html', 'client');
  api.addFiles('templates/app-preview.html', 'client');
  api.addFiles('i18n/en.i18n.json', ['client', 'server']);
  api.addFiles('i18n/es.i18n.json', ['client', 'server']);

  api.addAssets('images/worona.svg', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-theme-chess');
});
