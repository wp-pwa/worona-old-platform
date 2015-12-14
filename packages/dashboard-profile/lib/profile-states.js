State.modify('profile.isReady', (state) => {
  if (Meteor.userId()) {
    let handle = Meteor.subscribe('profile');
    return !!handle && handle.ready();
  } else {
    return false;
  }
});

State.modify('profile', (state) => {
  if (State.get('profile.isReady')) {
    let user = Meteor.users.findOne(Meteor.userId());
    return user.profile;
  } else {
    return {};
  }
});

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'profile',
    template: 'profileMenuItem',
    order: 50
  });
  return state;
});
