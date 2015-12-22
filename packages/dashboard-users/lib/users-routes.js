FlowRouter.route('/login', {
  name: 'login',
  type: 'SHOW_LOGIN',
  layout: 'fullLayout'
});

FlowRouter.route('/create-your-first-app', {
  name: 'createYourFirstApp',
  type: 'SHOW_CREATE_YOUR_FIRST_APP',
  layout: 'fullLayout'
});

FlowRouter.route('/profile', {
  name: 'profile',
  type: 'SHOW_PROFILE',
  layout: 'generalLayout'
});

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (!Meteor.userId()) {
      redirect('/login');
    }
  }], { except: ['login'] });

FlowRouter.triggers.enter([
  (context, redirect) => {
    if (Meteor.userId()) {
      redirect('/create-your-first-app');
    }
  }], { only: ['login'] });

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
