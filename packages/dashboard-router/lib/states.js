let pages = [
  'isHome',
  'isProfile',
  'isLogin',
  'isGeneralSettings',
  'isCreateYourFirstApp'
];

let setPage = newPage => {
  pages.map(page => {
    if (page === newPage)
      AppState.set(page, true);
    else
      AppState.set(page, false);
  });
};

Dispatcher.register(action => {
  switch (action.type) {
    case 'SHOW_HOME':
      setPage('isHome');
      break;
    case 'SHOW_PROFILE':
      setPage('isProfile');
      break;
    case 'SHOW_LOGIN':
      setPage('isLogin');
      break;
    case 'SHOW_CREATE_YOUR_FIRST_APP':
      setPage('isCreateYourFirstApp');
      break;
    case 'SHOW_APP_GENERAL_SETTINGS':
      setPage('isGeneralSettings');
      AppState.set('appId', action.id);
      break;
    case 'LOGIN_SUCCESSFUL':
      let redirectAfterLogin = AppState.get('redirectAfterLogin');
      FlowRouter.go(redirectAfterLogin);
      break;
  }
});
