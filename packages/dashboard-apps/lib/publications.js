Meteor.publish('UserApps', function() {
  return Apps.find({ userId: this.userId });
});
