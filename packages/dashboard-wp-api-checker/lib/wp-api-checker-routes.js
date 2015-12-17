FlowRouter.route('/app/:appId/wp-api-checker', {
  name: 'wpApiChecker',
  type: 'SHOW_WP_API_CHECKER',
  layout: 'fullLayout'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (context.route.pathDef === '/app/:appId') {
      redirect(`/app/${context.params.appId}/wp-api-checker`);
    }
  }
]);
