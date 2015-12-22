Template.createYourFirstApp.onRendered(function() {

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
        identifier  : 'url',
        optional    : true,
        rules: [
          {
            type   : 'url',
            prompt : 'Please enter a valid url'
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

Template.createYourFirstApp.events({
  'submit .ui.form'(event) {
    event.preventDefault();
    event.stopPropagation();

    let firstName = event.currentTarget.firstName.value;

    let url  = event.currentTarget.url.value;
    let name = s(url).strRight('://').strLeft('/').value();

    if (url === '') {
      url = 'https://www.worona.org';
      name = 'Worona Blog (example)';
    }

    Dispatch('PROFILE_CHANGED', { firstName })
      .then('APP_CREATION_SUCCEED', { name, url })
      .then('SHOW_APPS');
  }
});
