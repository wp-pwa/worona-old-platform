Dispatcher.register(action => {
  console.log("==> \"" + action.type + "\"");
  console.log(_.omit(action, 'type'));
});
