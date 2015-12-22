// We use Meteor.users and it is created by default.

UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    firstName: {
      type: 'string',
      validator: Validators.string()
    },
    apps: {
      type: 'array',
      default: () => []
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
