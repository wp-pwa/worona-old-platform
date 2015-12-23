// We use Meteor.users and it is created by default.

UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    firstName: {
      type: 'string',
      validator: Validators.string()
    }
  }
});

User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {
    createdAt: 'date',
    emails: {
      type: 'array',
      default: () => { return {}; }
    },
    profile: {
      type: 'object',
      nested: 'UserProfile',
      default: () => { return {}; }
    },
    apps: {
      type: 'array',
      default: () => []
    }
  }
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: 'object'
    }
  });
}