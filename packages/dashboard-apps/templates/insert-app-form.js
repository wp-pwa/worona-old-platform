Template.insertAppForm.events({
  'submit .ui.form'(event) {
    event.preventDefault();
    let name = event.currentTarget.name.value;
    let url = event.currentTarget.url.value;
    let doc = { settings: { general: {} }, production: { general: {} } };
    doc.settings.general.url = doc.production.general.url = url;
    doc.name = doc.settings.general.title = doc.production.general.title = name;
    let contextInsertApp = Schema.Apps.namedContext('insertApp');
    Schema.Apps.clean(doc);
    let isValid = contextInsertApp.validate(doc);
    if (isValid)
      Dispatch('INSERT_APP_SUCCEED');
    else
      Dispatch('INSERT_APP_FAILED');
  }
});
