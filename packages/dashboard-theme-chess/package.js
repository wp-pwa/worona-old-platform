Package.describe({
  name: 'worona:dashboard-theme-chess',
  version: '1.0.0',
  summary: 'Theme chess for Worona Dashboard.',
  git: 'https://github.com/worona/worona/',
  documentation: null,
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  // external libraries
  api.use('worona:external-libraries@1.0.0');
  api.use('meteorflux:first-then-finally-blaze@1.0.1');

  // i18n
  api.addFiles('package-tap.i18n', ['client', 'server']);

  api.use('templating', 'client');
  api.use('jquery', 'client');
  api.imply('jquery', 'client');

  api.use('webtempest:animate@0.1.9');
  api.use('worona:dashboard-i18n@1.0.0');

  // Theme files
  api.addFiles([
    'chess.js',
    'chess.html',
    'login.html',
    'create-your-first-app.html',
    'header.html',
    'footer.html',
    'left-menu.html',
    'home.html',
    'profile.html',
    'new-app-form.html',
    'app-card.html',
    'app-general-settings.html',
    'css/normalize.css',
    'css/webflow.css',
    'css/worona-dashboard.webflow.css',
    'css/custom.css',
    'js/modernizr.js',
    'js/webflow.js'
  ], 'client');

  api.addAssets([
    'images/worona.svg'
  ], 'client');

  api.addFiles([
    'i18n/en.i18n.json',
    'i18n/es.i18n.json',
  ], ['client', 'server']);

  api.export('WebFontConfig');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-theme-chess');
});
