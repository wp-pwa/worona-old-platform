// Server only methods.
if (Meteor.isServer) {
  Meteor.methods({
    ApplySettings({ appId }) {
      let user = Meteor.users.findOne(Meteor.userId());
      if (_.indexOf(user.apps, appId) !== -1) {
        let settings = Settings.find({ appId: appId }).fetch();
        _.each(settings, testerSetting => {
          let raw = testerSetting.raw();
          ProductionSettings.upsert(
            { appId: testerSetting.appId, extension: testerSetting.extension },
            raw
          );
        });
      } else {
        throw new Meteor.Error('app-not-owned', 'This app is not owned by you');
      }
    }
  });
}
