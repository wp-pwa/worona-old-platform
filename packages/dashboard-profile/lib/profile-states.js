let handle = Meteor.subscribe('profile');

State.modify('profile.isReady', (state = false) => {
  return !!handle && handle.ready();
});

State.modify('profile', (state = {}) => {
  return Meteor.users.findOne(Meteor.userId());
});

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'profile',
    template: 'profileMenuItem',
    order: 50
  });
  return state;
});
