Template.WpApiChecker_Checking.helpers({
  name() {
    return State.get('App.name');
  }
});

Template.WpApiChecker_Failed.events({
  'submit #change-url-and-check'(event) {
    event.preventDefault();
    event.stopPropagation();
    let appUrl = event.currentTarget.appUrl;
    Dispatch('APP_CHANGED', { appUrl })
      .then('CHECK_WP_API');
  }
});
