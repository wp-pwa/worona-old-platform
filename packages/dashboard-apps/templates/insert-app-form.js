Template.insertAppForm.events({
  'submit .ui.form'(event) {
    event.preventDefault();
    let name = event.currentTarget.name.value;
    let url = event.currentTarget.url.value;
    let doc = { settings: { general: {} }, production: { general: {} } };
    doc.settings.general.url = doc.production.general.url = url;
    doc.name = doc.settings.general.title = doc.production.general.title = name;
    Schema.Apps.clean(doc);
    let context = Schema.Apps.namedContext('insertApp');
    let isValid = context.validate(doc);
    if (isValid)
      Dispatch('INSERT_APP_SUCCEED', { doc });
    else
      Dispatch('INSERT_APP_FAILED', { context });
  }
});
