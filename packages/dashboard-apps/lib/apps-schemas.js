App = Astro.Class({
  name: 'App',
  fields: {
    name: {
      type: 'string',
      validator: [
        Validators.required(null, 'Enter the name')
      ]
    },
    url: {
      type: 'string',
      validator: [
        Validators.required(null, 'Enter the url'),
        Validators.url(null,
          'Enter a valid url. Start with http:// or https://')
      ]
    },
    _id: {
      type: 'string',
      default: () => Random.id(),
      immutable: true,
      validator: [
        Validators.minLength(17),
        Validators.maxLength(17)
      ]
    }
  }
});
