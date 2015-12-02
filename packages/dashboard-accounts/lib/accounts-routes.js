FlowRouter.route('/login', {
  name: 'Login',
  type: 'SHOW_LOGIN',
  layout: 'FullScreen',
  content: 'Login'
});

FlowRouter.route('/create-your-first-app', {
  name: 'CreateYourFirstApp',
  type: 'SHOW_CREATE_YOUR_FIRST_APP',
  layout: 'FullScreen',
  content: 'CreateYourFirstApp'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (!Meteor.userId() && context.path !== '/login') {
      redirect('/login');
    }
  },
  (context, redirect) => {
    if (Meteor.userId() && context.path === '/login') {
      redirect('/create-your-first-app');
    }
  }
]);

Dispatch.filter(payload => {
  if (payload.type.startsWith('SHOW_') && !Meteor.userId())
    payload.type = 'SHOW_LOGIN';
  return payload;
});

Dispatch.filter(payload => {
  if (payload.type === ('SHOW_LOGIN') && Meteor.userId())
    payload.type = 'SHOW_CREATE_YOUR_FIRST_APP';
  return payload;
});
