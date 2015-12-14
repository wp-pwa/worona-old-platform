Register(() => {
  switch (Action.type()) {
    case 'INSERT_APP_SUCCEED':
      Meteor.call('insertApp', Action.doc);
      break;
    case 'UPDATE_APP_SUCCEED':
      let appId = State.get('app.id');
      Meteor.call('updateApp', appId, Action.doc);
      break;
  }
});
