Meteor.publish('apps', function() {
  return Apps.find({ userId: this.userId });
});
