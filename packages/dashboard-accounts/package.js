Package.describe({
  name: 'worona:dashboard-accounts',
  version: '1.0.0',
  summary: 'Worona Dashboard Accounts.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-default-state@1.0.0');
  api.use('accounts-password@1.1.3');
  api.use('kadira:flow-router@2.6.2');
  api.addFiles('lib/accounts.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('worona:dashboard-accounts');
});
