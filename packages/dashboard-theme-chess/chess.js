// Load jQuery correctly in the webflow js.
window.$ = jQuery;

// Load WebFont correctly in Meteor.
AppState.set('webFontLoaded', false);
WebFontConfig = {
  google: {
    families: ["Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"]
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

  Template.chess_createYourFirstApp.events({
    'submit .create-your-first-app'(event) {
      event.preventDefault();
      event.stopPropagation();
      Dispatcher.dispatch('NEW_APP_CREATED');
      FlowRouter.go(AppState.get('homeUrl'));
    }
  });
});
