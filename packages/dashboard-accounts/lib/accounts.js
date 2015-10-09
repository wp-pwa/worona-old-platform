let loginSent = function({ email, password }) {
  Meteor.loginWithPassword(email, password, function(err){

    // Error logging in.
    if (err) {

      // But error is user not found, let's create an account for him/her.
      if (err.message === "User not found [403]") {
        Accounts.createUser({ email, password }, function(err) {

          // Error creating the account. Report.
          if (err) {
            console.log('Error creating account: ', err);

          // Account created succesfully.
          } else {
            let createYourFirstAppUrl = AppState.get('createYourFirstAppUrl');
            FlowRouter.go(createYourFirstAppUrl);
          }
        });

      // Error logging in, report it.
      } else {
        Dispatcher.dispatch('LOGIN_FAILED', { error: err });
      }

    // Log in sucessful.
    } else {
      Dispatcher.dispatch('LOGIN_SUCCESS');
      let redirectAfterLogin = AppState.get('redirectAfterLogin');
      FlowRouter.go(redirectAfterLogin);
    }

  });
};

Dispatcher.register(action => {
  switch (action.type) {
    case 'LOGIN_FORM_SENT':
      // Get form values.
      let email = action.event.currentTarget.email.value;
      let password = action.event.currentTarget.password.value;
      // Set state.
      AppState.set('lastEmailEnteredInLogin', email);
      AppState.set('loginError', false);
      // Send action.
      loginSent({ email, password });
      break;
    case 'LOGOUT':
      AppState.set('loggingOut', true);
      Meteor.logout( function(err) {
        if (!err) {
          AppState.set('loggingOut', false);
          FlowRouter.go(AppState.get('loginUrl'));
        } else {
          console.log(err);
        }
      });
      break;
    case 'LOGIN_FAILED':
      AppState.set('loginError', action.error.reason);
      break;
  }
});

// Bind loggingIn state to meteor's loggingIn().
AppState.set('loggingIn', function() {
  return Meteor.loggingIn();
});

Tracker.autorun(function() {
  let email = AppState.get('lastEmailEnteredInLogin');
  let nameArray = s(email).strLeft('@').split('.');
  nameArray = nameArray.map(name => s.capitalize(name));
  let name = s.toSentence(nameArray, ' ', ' ');
  AppState.set('loginNameGuess', name);
});
