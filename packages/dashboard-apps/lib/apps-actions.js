let cleanUndefinedValues = function(object) {
  let undefineds = _.chain(object)
    .map((v, k) => { if (_.isUndefined(v)) return k; })
    .filter(v => !_.isUndefined(v))
    .value();
  return _.omit(object, undefineds);
};

Register(() => {
  let data = {
    name: Action.name,
    url: Action.url
  };
  data = cleanUndefinedValues(data);
  switch (Action.type()) {
    case 'NEW_APP_CREATED':
      Meteor.call('addNewApp', data);
      break;
    case 'APP_CHANGED':
      let id = State.get('app.id');
      Meteor.call('changeApp', id, data);
      break;
  }
});
