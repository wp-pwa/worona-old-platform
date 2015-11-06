Meteor.publish('UserProfile', function() {
  if(!this.userId)
    return null;
  else
    return Meteor.users.find(this.userId, { fields: { firstName: 1 } });
});
