Apps = new Mongo.Collection('apps');

Schema.Settings = new SimpleSchema({
  'general': {
    type: Object
  },
  'general.title': {
    type: String
  },
  'general.url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    autoValue: function() { return s.rtrim(this.value, '/'); }
  }
});

Schema.Apps = new SimpleSchema({
  'name': {
    type: String
  },
  'userId': {
    type: SimpleSchema.RegEx.Id,
    autoValue: () => Meteor.userId()
  },
  'createdAt': {
    type: Date,
    autoValue: () => new Date()
  },
  'updatedAt': {
    type: Date,
    autoValue: () => new Date()
  },
  'settings': {
    type: Schema.Settings
  },
  'production': {
    type: Schema.Settings
  }
});

Apps.attachSchema(Schema.Apps);
