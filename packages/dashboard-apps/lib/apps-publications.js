Meteor.publish('apps-tester', function() {
  if (!this.userId)
    return this.ready();
  else
    return Apps.find({ userId: this.userId });
});

Meteor.publish('app-production', function(id) {
  return Apps.find({ _id: id }, { fields: { settingsTester: 0 } });
});
