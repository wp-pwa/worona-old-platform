Register(() => {
  switch (Action.type()) {
    case 'APP_CREATION_SUCCEED':
      Action.app.save();
      break;
  }
});
