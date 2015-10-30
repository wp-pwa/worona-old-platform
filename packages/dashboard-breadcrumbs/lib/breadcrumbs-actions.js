let __ = TAPi18n.__;

AppState.modify('Breadcrumbs.items', (action, state = []) => {

  if (action.type.startsWith('SHOW_')) {
    let appName = AppState.get('CurrentApp.name');

    if (AppState.get('IsGeneralSettings')) {
      sectionName = __('General_Settings');
      sectionUrl = AppState.get('AppGeneralSettingsUrl');
    }

    if (sectionName) {
      return [
        { Name: __('Apps'), Url: '/', NextBreadcrumb: true},
        { Name: appName, Url: sectionUrl, NextBreadcrumb: true},
        { Name: sectionName, Url: '#', NextBreadcrumb: false}
      ];
    }
  }

  return state;
});
