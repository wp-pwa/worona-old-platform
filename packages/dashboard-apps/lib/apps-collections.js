Apps = new Mongo.Collection('apps');

var general = Astro.Class({
  name: 'general',
  fields: {
    title: {
      type: 'string',
      validator: [
        Validators.required(null, 'Please enter a title')
      ]
    },
    url: {
      type: 'string',
      validator: [
        Validators.url(null, 'It has to be a valid url')
      ]
    }
  },
  events: {
    beforeSet(e) {
      if (e.data.fieldName === 'url')
        e.data.setValue = s.rtrim(e.data.setValue, '/');
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
    url: {
      type: 'string',
      transient: true,
      optional: true,
      validator: [
        Validators.url(null, 'It has to be a valid url')
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
  },
  events: {
    afterSet(e) {
      if (e.data.fieldName === 'url') {
        this.set('settings.general.url', e.data.setValue);
        this.set('production.general.url', e.data.setValue);
      } else if (e.data.fieldName === 'name') {
        if (this.get('settings.general.title') === null)
          this.set('settings.general.title', e.data.setValue);
        if (this.get('production.general.title') === null)
          this.set('production.general.title', e.data.setValue);
     }
    }
  }
});
