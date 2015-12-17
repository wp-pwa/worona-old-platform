Security.defineMethod("ifIsOwner", {
  fetch: [],
  transform: null,
  deny: function (type, arg, userId, doc) {
    return userId !== doc._id;
  }
});

Apps.permit(['insert']).ifLoggedIn().apply();

Apps.permit(['update']).apply();
