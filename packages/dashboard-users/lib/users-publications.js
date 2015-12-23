Meteor.publish('user', function() {
  if (!this.userId) return this.ready();
  else
    return Meteor.users.find(this.userId, { fields: { profile: 1, apps: 1 } });
});
