FlowRouter.route('/app/:AppId/wp-api-checker', {
  name: 'WpApiChecker',
  type: 'SHOW_WP_API_CHECKER',
  helper: 'IsWpApiChecker'
});
