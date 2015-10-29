
// Async actions
Dispatcher.register(action => {
  switch (action.type) {
    case 'LOGIN_FORM_SENT':
      let email = action.event.currentTarget.email.value;
      let password = action.event.currentTarget.password.value;
      loginSent({ email, password });
      break;
    case 'LOGOUT':
      Meteor.logout( function(err) {
        if (!err) {
          Dispatcher.dispatch('SHOW_LOGIN');
        } else {
          console.log(err);
        }
      });
      break;
  }
});

// Async login action.
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

          // Account created succesfully. Show 'CreateYourFirstApp' template.
          } else {
            Dispatcher.dispatch('SHOW_CREATE_YOUR_FIRST_APP');
          }
        });

      // Error logging in, report it.
      } else {
        Dispatcher.dispatch('LOGIN_FAILED', { error: err });
      }

    // Log in sucessful.
    } else {
      Dispatcher.dispatch('LOGIN_SUCCESS');
      Dispatcher.dispatch('SHOW_HOME');
    }
  });
};

AppState.modify('LoggingIn', (action, state = false) => {
  switch (action.type) {
    case 'LOGIN_FORM_SENT':
      return true;
    default:
      return false;
  }
});

// Use LogInError to show Meteor's errors to the user.
AppState.modify('LogInError', (action, state = false) => {
  switch (action.type) {
    case 'LOGIN_FAILED':
      return action.error.reason;
    default:
      return false;
  }
});

// Give feedback when user has clicked the LogOut button.
AppState.modify('LoggingOut', (action, state = false) => {
  switch (action.type) {
    case 'LOGOUT':
      return true;
    default:
      return false;
  }
});

// Get last email used so when the user logs out, it doesn't have to write
// it again.
AppState.modify('LastEmailUsed', (action, state = '') => {
  switch (action.type) {
    case 'LOGIN_FORM_SENT':
      let email = action.event.currentTarget.email.value;
      return email;
    default:
      return state;
  }
});

// Get a guess of the user name for the second step.
AppState.modify('NameGuess', (action, state = '') => {
  switch (action.type) {
    case 'LOGIN_FORM_SENT':
      let email = action.event.currentTarget.email.value;
      let nameArray = s(email).strLeft('@').split('.');
      nameArray = nameArray.map(name => s.capitalize(name));
      let name = s.toSentence(nameArray, ' ', ' ');
      return name;
    default:
      return state;
  }
});
