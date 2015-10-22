let __ = TAPi18n.__;

Tracker.autorun(() => {
  let appName = AppState.get('CurrentApp.name');
  let sectionName = null;

  if (AppState.get('IsGeneralSettings')) {
    sectionName = __('General_Settings');
    sectionUrl = AppState.get('AppGeneralSettingsUrl');
  }

  if (sectionName) {
    AppState.set('Breadcrumbs.items', [
      { Name: __('Apps'), Url: '/', NextBreadcrumb: true},
      { Name: appName, Url: sectionUrl, NextBreadcrumb: true},
      { Name: sectionName, Url: '#', NextBreadcrumb: false}
    ]);
  } else {
    AppState.set('Breadcrumbs.items', []);
  }
});
