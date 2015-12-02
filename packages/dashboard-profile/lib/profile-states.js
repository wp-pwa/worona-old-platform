let handle = Meteor.subscribe('UserProfile');

State.modify('Profile.isReady', (state = false) => {
  return !!handle && handle.ready();
});

State.modify('Profile', (state = {}) => {
  return Meteor.users.findOne(Meteor.userId());
});

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'Profile',
    template: 'ProfileMenuItem',
    order: 50
  });
  return state;
});
