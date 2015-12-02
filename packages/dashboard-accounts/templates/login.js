Template.Login.onRendered(function() {

  $('.ui.form').form({
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your e-mail'
          },
          {
            type   : 'email',
            prompt : 'Please enter a valid e-mail'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your password'
          },
          {
            type   : 'length[4]',
            prompt : 'Your password must be at least 4 characters'
          }
        ]
      }
    }
  });

  this.autorun(() => {
    let error = State.get('LogInError');
    if (error) {
      $('.ui.form').form('add errors', [
        error
      ]);
    }
  });

});
