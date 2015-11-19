Template.WpApiChecker_Checking.helpers({
  name() {
    return State.get('App.name');
  }
});

Template.WpApiChecker_Failed.events({
  'submit .change-url.form'(event) {
    event.preventDefault();
    event.stopPropagation();
    let appUrl = event.currentTarget.appUrl.value;
    Dispatch('APP_CHANGED', { appUrl })
      .then('CHECK_WP_API');
  }
});
