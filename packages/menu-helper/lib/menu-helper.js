Template.menu.onCreated(function() {
  let instance = Template.instance();
  let name = instance.data.name;
  check(name, String);
  let items = State.get('menu.' + name + '.items');
  instance.categories = _.chain(items)
    .sortBy(item => item.order)
    .groupBy(item => item.category)
    .map((array, key) => { return { name: key, items: array }; })
    .sortBy('name')
    .value();
});

Template.menu.helpers({
  categories() {
    return Template.instance().categories;
  }
});
