Package.describe({
  name: 'worona:theme-switcher',
  version: '1.0.0',
  summary: 'Theme switcher for Worona apps.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');

  api.addFiles('lib/theme-switcher-actions.js', 'client');
  api.addFiles('templates/theme.html', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:theme-switcher');
});
