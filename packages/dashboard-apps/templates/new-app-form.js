Template.newAppForm.events({
  'change input[name=url]'(event) {
    let app = this;
    let input = event.currentTarget;
    app.set('settings.general.url', input.value);
    app.set('production.general.url', input.value);
    app.validate();
    event.stopImmediatePropagation();
  },
  'change input'(event) {
    let app = this;
    let input = event.currentTarget;
    app.set(input.name, input.value);
    app.validate();
    event.stopImmediatePropagation();
  }
});
