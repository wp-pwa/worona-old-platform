// Load jQuery correctly in the webflow js.
window.$ = jQuery;

// Load WebFont correctly in Meteor.
WebFontConfig = {
  google: {
    families: [
      'Open Sans:300,300italic,400,400italic,600,600italic,' +
      '700,700italic,800,800italic'
    ]
  },
  active() {
    Dispatch('WEBFONT_LOADED');
  }
};

State.set('webFontLoaded', (state = false) => {
  if (Action.is('WEBFONT_LOADED'))
    return true;
  else
    return state;
});

Meteor.startup(() => {
  (function(d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
    s.parentNode.insertBefore(wf, s);
  })(document);

  Template.Chess_CreateYourFirstApp.events({
    'submit .create-your-first-app'(event) {
      event.preventDefault();
      event.stopPropagation();

      let firstName = event.currentTarget.firstName;
      let appUrl  = event.currentTarget.appUrl;
      let appName = s.strRight(appUrl.value, '://');
      appName = s.strLeft(appName, '/');

      if (appUrl.value === '') {
        appUrl = { value: 'https://www.worona.org' };
        appName = { value: 'Worona Blog (example)' };
      }

      Dispatch('PROFILE_CHANGED', { firstName })
        .then('NEW_APP_CREATED', { appName, appUrl })
        .then('SHOW_HOME');
    }
  });
});
