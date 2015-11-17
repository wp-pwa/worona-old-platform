Package.describe({
  name: 'worona:dashboard-semantic-ui',
  version: '1.0.0',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'jquery',
    'semantic:ui@=2.1.4_3',
    'flemay:less-autoprefixer',
    'semantic:ui-icon@2.1.4'
    // 'fortawesome:fontawesome@4.4.0'
  ]);
  api.imply([
    'semantic:ui@=2.1.4_3'
  ]);
  api.addFiles([
    'semantic-ui/custom.semantic.json',
    'semantic-ui/semantic.less',
    'semantic-ui/theme.config.import.less',
    'semantic-ui/site/globals/site.variables.import.less',
    'semantic-ui/site/collections/menu.variables.import.less',
    'semantic-ui/site/elements/input.variables.import.less',
    'semantic-ui/site/elements/segment.variables.import.less',
    'semantic-ui/definitions/behaviors/form.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('worona:dashboard-semantic-ui');
});
