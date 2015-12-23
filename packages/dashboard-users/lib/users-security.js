Security.defineMethod('ifIsThisUser', {
  fetch: ['_id'],
  deny: function (type, arg, userId, doc) {
    return userId !== doc._id;
  }
});

Meteor.users.permit('update')
  .ifIsThisUser()
  .onlyProps(['profile', 'apps'])
  .apply();
