FlowRouter.route('/app/:AppId/general-settings', {
  name: 'GeneralSettings',
  type: 'SHOW_GENERAL_SETTINGS',
  helper: 'IsGeneralSettings',
  layout: 'AppScreen',
  content: 'GeneralSettings'
});
