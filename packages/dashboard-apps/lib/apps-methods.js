SimpleSchema.debug = 1;

Meteor.methods({
  insertApp(doc) {
    Apps.insert(doc);
  },

  updateSettings(id, doc) {
    if (Apps.findOne(id).userId === this.userId) {
      Apps.update(id, {$set: doc });
    } else {
      throw new Meteor.Error('user-not-allowed-to-change-other-user-apps');
    }
  }
});
