GeneralSettings = SettingsSchema.inherit({
  name: 'general',
  fields: {
    title: {
      type: 'string',
      validator: [
        Validators.required(),
        Validators.minLength(2)
      ]
    },
    url: {
      type: 'string',
      validator: [
        Validators.required(),
        Validators.url()
      ]
    }
  }
});
