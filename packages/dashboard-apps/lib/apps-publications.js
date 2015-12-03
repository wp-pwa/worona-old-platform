Meteor.publish('apps', function() {
  if (!this.userId) return this.ready();
  else
    return Apps.find({ userId: this.userId });
});
