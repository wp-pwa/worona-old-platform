// If user is logged in. Let's subscribe.
let handle = null;

Tracker.autorun(() => {
  if (Meteor.userId())
    handle = Meteor.subscribe('UserApps');
  else if (handle)
    handle.stop();
});

// Create a helper when the subscription is ready.
AppState.set('Apps.isReady', () => {
  return !!handle && handle.ready();
});

// Populate the data.
AppState.set('Apps', () => {
  return Apps.find({}, { sort: { modifiedAt: -1 } });
});
