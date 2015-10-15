Meteor.methods({
  changeProfile(data) {
    check(data, Fields);
    Meteor.users.update(Meteor.userId(), { $set: data });
  }
});
