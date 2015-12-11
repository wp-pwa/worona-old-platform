Meteor.methods({
  addNewApp(app) {
    if (app.validate())
      app.save();
  },

  changeTester(id, data) {
    check(data, { settingsTester: { pattern } });
    if (Apps.findOne(id).userId === this.userId) {
      let doc = populateDoc(data);
      Apps.update(id, {$set: doc });
    } else {
      throw new Meteor.Error('user-not-allowed-to-change-other-user-apps');
    }
  },

  changeProduction(id, data){
    check(data, { settingsProduction: { pattern } });
  }
});
