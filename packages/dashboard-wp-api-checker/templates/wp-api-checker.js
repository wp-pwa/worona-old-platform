Template.wpApiChecker_Checking.helpers({
  name() {
    return State.get('app.name');
  }
});

Template.wpApiChecker_Failed.events({
  'submit .change-url.form'(event) {
    event.preventDefault();
    event.stopPropagation();
    let url = event.currentTarget.url.value;
    Dispatch('APP_CHANGED', { url })
      .then('CHECK_WP_API');
  }
});

Template.wpApiChecker_Failed.onRendered(() => {
  $('.ui.accordion')
    .accordion()
  ;
  $('.explanation .title')
    .popup()
  ;
});
