// Load jQuery correctly in the webflow js.
window.$ = jQuery;

// Load WebFont correctly in Meteor.
AppState.set('webFontLoaded', false);
WebFontConfig = {
  google: {
    families: [
      'Open Sans:300,300italic,400,400italic,600,600italic,' +
      '700,700italic,800,800italic'
    ]
  },
  active() {
    AppState.set('webFontLoaded', true);
  }
};

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

      let name = event.currentTarget.name.value;
      let url  = event.currentTarget.url.value;

      Dispatcher.dispatch('PROFILE_CHANGED', { name });
      Dispatcher.dispatch('NEW_APP_CREATED', { url });

      FlowRouter.go(AppState.get('HomeUrl'));
    }
  });
});


getUserLanguage = function () {
  // Put here the logic for determining the user language
  return "es";
};


Meteor.startup(function () {
  AppState.set("ShowLoadingIndicator", true);

  TAPi18n.setLanguage(getUserLanguage())
    .done(function () {
      AppState.set("ShowLoadingIndicator", false);
    }).fail(function (error_message) {
      // Handle the situation
      console.log(error_message);
    });
});
