FlowRouter.route('/apps', {
  name: 'Apps',
  type: 'SHOW_APPS',
  layout: 'GeneralScreen',
  content: 'Apps'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (context.path === '/') {
      redirect('/apps');
    }
  }
]);

// State.modify('Menus.General', (state = []) => {
//   state.push({
//     template:
//   });
//   return state;
// });
