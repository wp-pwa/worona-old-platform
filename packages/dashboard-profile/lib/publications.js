Meteor.publish('profile', function() {
  if(!this.userId) return null;

  
  return Meteor.users.find(this.userId, { fields: { name: 1 } });
});
