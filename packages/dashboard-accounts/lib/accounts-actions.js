Register(() => {
  switch (Action.type()) {
    case 'LOGIN_FORM_SENT':
      let email = Action.event.currentTarget.email.value;
      let password = Action.event.currentTarget.password.value;
      loginSent({ email, password });
      break;
    case 'LOGOUT':
      Meteor.logout( function(error) {
        if (!error) {
          Dispatch('LOGOUT_SUCCEED').then('SHOW_LOGIN');
        } else {
          Dispatch('LOGOUT_FAILED', { error });
        }
      });
      break;
  }
});


// Async login action.
var loginSent = function({ email, password }) {
  Meteor.loginWithPassword(email, password, function(error){

    // Error logging in.
    if (error) {

      // But error is user not found, let's create an account for him/her.
      if (error.message === "User not found [403]") {
        Accounts.createUser({ email, password }, function(error) {

          // Error creating the account. Report.
          if (error) {
            Dispatch('ACCOUNT_CREATION_FAILED', { error });

          // Account created succesfully. Show 'CreateYourFirstApp' template.
          } else {
            Dispatch('ACCOUNT_CREATION_SUCCEED')
            .then('SHOW_CREATE_YOUR_FIRST_APP');
          }
        });

      // Error logging in, report it.
      } else {
        Dispatch('LOGIN_FAILED', { error });
      }

    // Log in sucessful.
    } else {
      Dispatch('LOGIN_SUCCESS').then('SHOW_HOME');
    }
  });
};
