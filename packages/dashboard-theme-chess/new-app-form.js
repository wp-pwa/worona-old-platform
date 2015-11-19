Template.Chess_NewAppForm.onRendered(function() {

  $('.ui.form').form({
    fields: {
      appName: {
        identifier  : 'appName',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter the app name'
          }
        ]
      },
      appUrl: {
        identifier  : 'appUrl',
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
