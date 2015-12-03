State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'profile',
    template: 'logoutMenuItem',
    order: 100
  });
  return state;
});

State.modify('accounts.loggingIn', () => {
  return Meteor.loggingIn();
});

State.modify('accounts.logInError', (state = false) => {
  if (Action.is('LOGIN_FAILED'))
    return Action.error.reason;
  else
    return false;
});

State.modify('accounts.loggingOut', (state = false) => {
  if (Action.is('LOGOUT'))
    return true;
  else
    return false;
});

// Get a guess of the user name for the second step.
State.modify('accounts.nameGuess', (state = '') => {
  if (Action.is('LOGIN_FORM_SENT')) {
    let email = Action.event.currentTarget.email.value;
    let nameArray = s(email).strLeft('@').split('.');
    nameArray = nameArray.map(name => s.capitalize(name));
    let name = s.toSentence(nameArray, ' ', ' ');
    return name;
  } else {
    return state;
  }
});
