Posts = new Mongo.Collection('posts');

Post = Astro.Class({
  name: 'Post',
  collection: Posts,
  fields: {
    title: 'string',
    desc: 'string'
  }
});

if (Meteor.isClient) {
  State.modify('post', (state) => {
    return Posts.findOne();
  });
  State.set('hola', 'hola');
}
