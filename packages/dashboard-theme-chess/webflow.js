// Fix to load jQuery correctly in the webflow js
window.$ = jQuery;

Meteor.startup(() => {
  
  WebFont.load({
    google: {
      families: ["Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"]
    }
  });
});
