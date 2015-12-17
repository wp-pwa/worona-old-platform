Template.newAppForm.events({
  'change input'(event) {
    let app = this;
    let input = event.currentTarget;
    app.set(input.name, input.value);
    app.validate(input.name);
  },
  'submit .ui.form'(event) {
    event.preventDefault();
    let app = this;
    if (app.validate())
      Dispatch('APP_CREATION_SUCCEED', { app });
    else
      Dispatch('APP_CREATION_FAILED', { app });
  }
});
