Register(() => {
  switch (Action.type()) {
    case 'UPDATE_APP_SUCCEDD':
      let appId = State.get('app.id');
      Meteor.call('updateApp', appId, Action.doc);
      break;
  }
});
