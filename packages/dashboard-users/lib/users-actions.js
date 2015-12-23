Register(() => {
  let user;
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

    case 'PROFILE_CHANGE_SENT':
      user = Action.user;
      if (user.validate())
        user.save((error, _id) => {
          if (error)
            Dispatch('PROFILE_CHANGE_FAILED', { error });
          else
            Dispatch('PROFILE_CHANGE_SUCCEED', { user });
        });
      break;

    case 'APP_CREATION_SENT':
      let app = Action.app;
      user = Meteor.users.findOne(Meteor.userId());
      user.push('apps', Action.app._id);
      if (user.validate())
        user.save((error, _id) => {
          if (error)
            Dispatch('APP_CREATION_FAILED', { error });
          else
            Dispatch('APP_CREATION_SUCCEED', { app });
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