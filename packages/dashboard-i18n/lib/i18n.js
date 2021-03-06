i18n = {};

let momentReady = new ReactiveVar(false);
let tapi18nReady = new ReactiveVar(false);

i18n.setLanguage = function (language) {

  language = language.toLowerCase();

  // moment
  if (language.toLowerCase() === 'en') {
    mo.setLocale(language);
    momentReady.set(true);
  } else {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/" +
      language + ".js", function (result) {
        mo.setLocale(language);
        momentReady.set(true);
      }
    );
  }

  // TAPi18n
  TAPi18n.setLanguage(language)
    .done(function () {
      tapi18nReady.set(true);
    });
};

State.modify('lang.isReady', (state = false) => {
  if (momentReady.get() && tapi18nReady.get())
    return true;
  else
    return false;
});

Meteor.startup(function () {
  i18n.setLanguage('en');
});
