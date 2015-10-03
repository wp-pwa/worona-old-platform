Package.describe({
  name: 'worona:wordpress-org-api',
  version: '0.5.0',
  summary: 'Wrapper package for the npm package wordpress-rest-api',
  git: 'https://github.com/kadamwhite/wordpress-rest-api',
  documentation: 'README.md'
});

Npm.depends({
  'wordpress-rest-api':'0.5.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('cosmos:browserify@0.8.0', 'client');
  api.addFiles('client.browserify.js', 'client');
  api.export('WordpressOrgApi');
});

Package.onTest(function(api) {
  api.use('worona:external-libraries');
  api.use('tinytest');
});
