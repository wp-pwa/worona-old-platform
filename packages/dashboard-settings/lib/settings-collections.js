Settings = new Mongo.Collection('settings-tester');

Setting = Astro.Class({
  name: 'Setting',
  collection: Settings,
  fields: {
    extension: {
      type: 'string'
    },
    active: {
      type: 'boolean',
      default: () => false
    }
  }
});
