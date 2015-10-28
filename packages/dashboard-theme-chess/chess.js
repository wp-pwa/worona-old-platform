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
    Dispatcher.dispatch('WEBFONT_LOADED');
  }
};

AppState.modify('webFontLoaded', (action, state = false) => {
  if (action.type === 'WEBFONT_LOADED')
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

      let firstName = event.currentTarget.firstName.value;
      let appUrl  = event.currentTarget.appUrl.value;
      let appName = s.strRight(appUrl, '://');
      appName = s.strLeft(appName, '/');

      if (appUrl === '') {
        appUrl = 'https://www.worona.org';
        appName = 'Worona Blog (example)';
      }

      Dispatcher.dispatch('PROFILE_CHANGED', { firstName });
      Dispatcher.dispatch('NEW_APP_CREATED', { appName, appUrl });
      Dispatcher.dispatch('SHOW_HOME');
    }
  });
});
