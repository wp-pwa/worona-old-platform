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

  api.use('templating', 'client');
  api.use('jquery', 'client');
  api.imply('jquery', 'client');

  api.addFiles([
    'chess.js',
    'chess.html',
    'header.html',
    'footer.html',
    'left-menu.html',
    'home.html',
    'profile.html',
    'css/1-normalize.css',
    'css/2-webflow.css',
    'css/3-worona-dashboard.webflow.css',
    'js/modernizr.js',
    'js/webflow.js',
  ], 'client');

  api.addAssets([
    'images/worona.svg'
  ], 'client');

  api.export('WebFontConfig');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-theme-chess');
});
