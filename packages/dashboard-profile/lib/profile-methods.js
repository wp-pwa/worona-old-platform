let fields = {
  firstName: Match.Optional(String)
};

Meteor.methods({
  changeProfile(data) {
    check(data, fields);

    Meteor.users.update(Meteor.userId(), { $set: data });
  }
});
