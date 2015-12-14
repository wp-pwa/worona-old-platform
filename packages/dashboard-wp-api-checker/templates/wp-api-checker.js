var changeUrlContext = Schema.Apps.namedContext('wpApiChecker.changeUrl');

Template.wpApiChecker_Failed.events({
  'submit .change-url.form'(event) {
    event.preventDefault();
    event.stopPropagation();
    let url = event.currentTarget.url.value;
    let doc = { settings: { general: { url } } };
    let valid = changeUrlContext.validateOne(doc, 'settings.general.url');
    if (valid) {
      Dispatch('UPDATE_APP_SUCCEED', { doc });
    } else {
      Dispatch('UPDATE_APP_FAILED', { context: changeUrlContext });
    }
  }
});

Template.wpApiChecker_Failed.onRendered(() => {
  $('.ui.accordion')
    .accordion();
  $('.explanation .title')
    .popup();
});
