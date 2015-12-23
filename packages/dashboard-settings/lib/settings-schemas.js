Settings = new Mongo.Collection('settings-tester');
ProductionSettings = new Mongo.Collection('settings-production');

SettingsSchema = Astro.Class({
  name: 'setting',
  collection: Settings,
  typeField: 'extension',
  fields: {
    appId: {
      type: 'string',
      index: 1,
      validator: [
        Validators.required(),
        Validators.minLength(17),
        Validators.maxLength(17)
      ]
    },
    extension: {
      type: 'string',
      validator: [
        Validators.required()
      ]
    },
    active: {
      type: 'boolean',
      index: 1,
      default: () => false,
      validator: [
        Validators.boolean()
      ]
    }
  }
});
