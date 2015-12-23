

State.modify('menu.app.items', (state = []) => {
  state.push({
    category: 'settings',
    template: 'generalSettingsMenuItem'
  });
  return state;
});
