Meteor.methods({
  changeProfile(data) {
    let user = Meteor.users.findOne(Meteor.userId());
    user.profile.set(data);

    if (user.validate())
      user.save();
    else
      user.throwValidationException();
  }
});
