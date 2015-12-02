Template.NewAppForm.onRendered(function() {

  $('.ui.form').form({
    fields: {
      appName: {
        identifier  : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the app name'
          }
        ]
      },
      appUrl: {
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
