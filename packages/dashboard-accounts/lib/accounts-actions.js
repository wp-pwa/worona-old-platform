Register(() => {
  switch (Action.type()) {
    case 'LOGIN_FORM_SENT':
      let email = Action.event.currentTarget.email.value;
      let password = Action.event.currentTarget.password.value;
      loginSent({ email, password });
      break;
    case 'LOGOUT':
      Meteor.logout( function(err) {
        if (!err) {
          Dispatch('SHOW_LOGIN');
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
            Dispatch('ACCOUNT_CREATION_SUCCEED')
            .then('SHOW_CREATE_YOUR_FIRST_APP');
          }
        });

      // Error logging in, report it.
      } else {
        Dispatch('LOGIN_FAILED', { error: err });
      }

    // Log in sucessful.
    } else {
      Dispatch('LOGIN_SUCCESS').then('SHOW_HOME');
    }
  });
};
