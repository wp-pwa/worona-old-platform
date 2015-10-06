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
    'webflow.js',
    'chess.html',
    'head.html',
    'header.html',
    'footer.html',
    'home.html',
    'css/normalize.css',
    'css/webflow.css',
    'css/worona-dashboard.webflow.css',
    'js/modernizr.js',
    'js/webflow.js'
  ], 'client');

  api.addAssets([
    'images/worona.svg'
  ], 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-theme-chess');
});
