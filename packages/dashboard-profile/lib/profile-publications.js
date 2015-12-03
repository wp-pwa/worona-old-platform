Meteor.publish('profile', function() {
  if (!this.userId) return this.ready();
  else
    return Meteor.users.find(this.userId, { fields: { firstName: 1 } });
});
