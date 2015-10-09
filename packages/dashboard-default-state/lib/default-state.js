// Pages state
AppState.set('isHome', false);
AppState.set('isProfile', false);
AppState.set('isLogin', false);
AppState.set('isCreateYourFirstApp', false);
AppState.set('isGeneralSettings', false);

// Url state
AppState.set('homeUrl', '/');
AppState.set('profileUrl', '/profile');
AppState.set('loginUrl', '/login-or-sign-up');
AppState.set('createYourFirstAppUrl', '/create-your-first-app');

// Theme
AppState.set('theme', false);

// Login state
AppState.set('redirectAfterLogin', AppState.get('homeUrl'));
AppState.set('lastEmailEnteredInLogin', '');
AppState.set('loginNameGuess', 'John');
AppState.set('loginError', false);
AppState.set('loggingIn', false);
AppState.set('loggingOut', false);
