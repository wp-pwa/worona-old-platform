State.modify('app', (state = {}) => {
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return new App();
    default:
      return state;
  }
});

State.modify('apps.isNewAppFormOpen', (state = false) => {
  switch (Action.type()) {
    case 'OPEN_NEW_APP_FORM':
      return true;
    case 'CLOSE_NEW_APP_FORM':
      return false;
    default:
      return state;
  }
});

State.modify('menu.general.items', (state = []) => {
  state.push({
    category: 'dashboard',
    template: 'appMenuItem',
    order: 10
  });
  return state;
});
