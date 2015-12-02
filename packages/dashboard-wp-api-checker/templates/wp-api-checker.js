Template.WpApiChecker_Checking.helpers({
  name() {
    return State.get('App.name');
  }
});

Template.WpApiChecker_Failed.events({
  'submit .change-url.form'(event) {
    event.preventDefault();
    event.stopPropagation();
    let url = event.currentTarget.url.value;
    Dispatch('APP_CHANGED', { url })
      .then('CHECK_WP_API');
  }
});

Template.WpApiChecker_Failed.onRendered(() => {
  $('.ui.accordion')
    .accordion()
  ;
});
