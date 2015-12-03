Template.apps_newAppForm.onRendered(function() {

  $('.ui.form').form({
    fields: {
      name: {
        identifier  : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the app name'
          }
        ]
      },
      url: {
        identifier  : 'url',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the url of your blog'
          },
          {
            type   : 'url',
            prompt : 'Please enter a valid url'
          }
        ]
      }
    }
  });
});
