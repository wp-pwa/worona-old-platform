Apps = new Mongo.Collection('apps');

var general = Astro.Class({
  name: 'general',
  fields: {
    name: {
      type: 'string',
      validator: [
        Validators.required(null, 'Please enter a name')
      ]
    },
    url: {
      type: 'string',
      validator: [
        Validators.url(null, 'It has to be a url')
      ]
    }
  }
});

Settings = Astro.Class({
  name: 'Settings',
  fields: {
    general: {
      type: 'object',
      nested: 'general',
      default: () => { return {}; }
    }
  }
});

App = Astro.Class({
  name: 'app',
  collection: Apps,
  fields: {
    name: {
      type: 'string',
      validator: [
        Validators.required(null, 'Please enter a name')
      ]
    },
    userId: {
      type: 'string',
      default: () => Meteor.userId(),
      immutable: true
    },
    settings: {
      type: 'object',
      nested: 'Settings',
      default: () => { return {}; }
    },
    production: {
      type: 'object',
      nested: 'Settings',
      default: () => { return {}; }
    }
  },
  behaviors: {
    timestamp: {}
  }
});
