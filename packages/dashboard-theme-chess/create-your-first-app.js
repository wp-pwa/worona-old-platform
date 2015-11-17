Template.Chess_CreateYourFirstApp.onRendered(function() {

  $('.ui.form').form({
    fields: {
      firstName: {
        identifier  : 'firstName',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name'
          }
        ]
      },
      appUrl: {
        identifier  : 'appUrl',
        optional    : true,
        rules: [
          {
            type   : 'url',
            prompt : 'Please enter the url of your blog'
          }
        ]
      },
      terms: {
        identifier: 'terms',
        rules: [
          {
            type: 'checked',
            prompt: 'Please accept the terms and conditions.'
          }
        ]
      }
    }
  });
});

Template.Chess_CreateYourFirstApp.events({
  'submit .ui.form'(event) {
    event.preventDefault();
    event.stopPropagation();

    let firstName = event.currentTarget.firstName.value;

    let url  = event.currentTarget.appUrl.value;
    let name = s(url).strRight('://').strLeft('/').value();

    if (url === '') {
      url = 'https://www.worona.org';
      name = 'Worona Blog (example)';
    }

    Dispatch('PROFILE_CHANGED', { firstName })
      .then('NEW_APP_CREATED', { name, url })
      .then('SHOW_HOME');
  }
});
