Package.describe({
  name: 'worona:dashboard-i18n',
  version: '1.0.0',
  summary: 'Worona Dashboard i18n.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('momentjs:moment@2.10.6');
  api.use('lbee:moment-helpers@1.2.0');

  api.addFiles('lib/i18n.js', 'client');

  api.export('i18n');
  api.export('moment');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-i18n');
});
