AppState.set('theme', 'chess');

Tracker.autorun(()=>{
  let theme = AppState.get('theme');
  BlazeLayout.render(theme);
});
