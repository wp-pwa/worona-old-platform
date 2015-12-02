/* jshint -W101 */
Package.describe({
  name: 'worona:dashboard-semantic-ui',
  version: '1.0.0',
  summary: 'Worona Dashboard Semanti UI provider.',
  git: 'https://github.com/worona/worona/',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use('worona:external-libraries@1.0.0');
  api.use('worona:dashboard-external-libraries@1.0.0');
  api.use('flemay:less-autoprefixer');
  api.use('semantic:ui@=2.1.4_3');
  api.use('semantic:ui-icon@2.1.4');

  api.addFiles('semantic-ui/custom.semantic.json', 'client');
  api.addFiles('semantic-ui/semantic.less', 'client');
  api.addFiles('semantic-ui/theme.config.import.less', 'client');
  api.addFiles('semantic-ui/site/globals/site.variables.import.less', 'client');
  api.addFiles('semantic-ui/site/globals/site.overrides.import.less', 'client');
  api.addFiles('semantic-ui/site/collections/menu.variables.import.less', 'client');
  api.addFiles('semantic-ui/site/collections/menu.overrides.import.less', 'client');
  api.addFiles('semantic-ui/site/collections/form.variables.import.less', 'client');
  api.addFiles('semantic-ui/site/elements/input.variables.import.less', 'client');
  api.addFiles('semantic-ui/site/elements/segment.variables.import.less', 'client');
  api.addFiles('semantic-ui/site/elements/label.variables.import.less', 'client');
  api.addFiles('semantic-ui/site/views/card.variables.import.less', 'client');
  api.addFiles('semantic-ui/definitions/behaviors/form.js', 'client');
  api.addFiles('semantic-ui/definitions/modules/accordion.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('worona:dashboard-semantic-ui');
});
