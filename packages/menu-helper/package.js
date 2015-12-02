Package.describe({
  name: 'worona:menu-helper',
  version: '1.0.0',
  summary: 'Helper to create menus in Worona.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');

  api.addFiles('lib/menu-helper.html', 'client');
  api.addFiles('lib/menu-helper.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:menu-helper');
});
