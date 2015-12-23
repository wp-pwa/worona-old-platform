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

    let app = new App({ name, url });
    let user = Meteor.users.findOne(Meteor.userId());
    user.profile.set({ firstName });

    if (!user.validate()) {
      Dispatch('PROFILE_CHANGE_FAILED', { user });
    } else if (!app.validate()) {
      Dispatch('APP_CREATION_FAILED', { app });
    } else {
      Dispatch('PROFILE_CHANGE_SENT', { user })
        .then('APP_CREATION_SENT', { app })
        .then('SHOW_APPS');
    }


  }
});
