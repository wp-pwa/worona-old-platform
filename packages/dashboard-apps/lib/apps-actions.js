Register(() => {
  let data = {
    name: Action.name,
    url: s.rtrim(Action.url, '/')
  };
  switch (Action.type()) {
    case 'NEW_APP_CREATED':
      let app = State.get('app');
      app.set('name', data.name);
      app.settings.general.set(data);
      app.production.general.set(data);

      if (app.validate()) {
        Meteor.call('addNewApp', app);
      }

      break;
    case 'APP_CHANGED':
      let id = State.get('app.id');
      Meteor.call('changeApp', id, data);
      break;
  }
});
