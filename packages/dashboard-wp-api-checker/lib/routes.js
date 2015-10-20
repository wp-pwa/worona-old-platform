FluxRouter.routes({
  WpApiChecker: {
    path: '/app/:AppId/wp-api-checker',
    action: 'SHOW_WP_API_CHECKER',
    helper: 'IsWpApiChecker'
  }
});
