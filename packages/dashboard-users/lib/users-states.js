var handle = Meteor.subscribe('user');
State.modify('user.isReady', (state = false) => {
  return !!handle && handle.ready();
});

State.modify('user.profile', (state = {}) => {
  let user = Meteor.users.findOne(Meteor.userId());
  return user ? user.profile.raw() : {};
});

State.modify('user.loggingIn', () => {
  return Meteor.loggingIn();
});

State.modify('user.logInError', (state = false) => {
  if (Action.is('LOGIN_FAILED'))
    return Action.error.reason;
  else
    return false;
});

State.modify('user.loggingOut', (state = false) => {
  if (Action.is('LOGOUT'))
    return true;
  else
    return false;
});

// Get a guess of the user name for the second step.
State.modify('user.nameGuess', (state = '') => {
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

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'profile',
    template: 'logoutMenuItem',
    order: 100
  });
  state.push({
    category: 'profile',
    template: 'profileMenuItem',
    order: 50
  });
  return state;
});
