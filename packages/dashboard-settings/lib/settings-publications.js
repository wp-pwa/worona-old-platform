Meteor.publish('settings-tester', function() {
  if (!this.userId) return this.ready();
  let user = Meteor.users.findOne(this.userId);
  return Settings.find({ appId: { $in: user.apps } });
});

Meteor.publish('settings-production', function() {
  if (!this.userId) return this.ready();
  let user = Meteor.users.findOne(this.userId);
  return ProductionSettings.find({ appId: { $in: user.apps } });
});
