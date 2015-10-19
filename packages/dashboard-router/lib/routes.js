FluxRouter.routes({
  Home: {
    path: '/',
    action: 'SHOW_HOME',
    helper: 'IsHome'
  },
  Login: {
    path: '/login',
    action: 'SHOW_LOGIN',
    helper: 'IsLogin'
  },
  Profile: {
    path: '/profile',
    action: 'SHOW_PROFILE',
    helper: 'IsProfile'
  },
  CreateYourFirstApp: {
    path: '/create-your-first-app',
    action: 'SHOW_CREATE_YOUR_FIRST_APP',
    helper: 'IsCreateYourFirstApp'
  },
  AppGeneralSettings: {
    path: '/app/:appId/general-settings',
    action: 'SHOW_APP_GENERAL_SETTINGS',
    helper: 'IsGeneralSettings'
  }
});
