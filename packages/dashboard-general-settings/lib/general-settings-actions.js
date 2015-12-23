Register(() => {
  switch (Action.type()) {
    case 'APP_CREATION_SUCCEED':
      var settings = new GeneralSettings({
        appId: Action.app._id,
        active: true,
        title: Action.app.name,
        url: Action.app.url
      });
      if (settings.validate())
        settings.save();
      break;
  }
});
