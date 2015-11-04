let __ = TAPi18n.__;

State.set('Breadcrumbs.items', (state = []) => {

  if (Action.type().startsWith('SHOW_')) {
    let appName = State.get('CurrentApp.name');

    if (State.get('IsGeneralSettings')) {
      sectionName = __('General_Settings');
      sectionUrl = State.get('AppGeneralSettingsUrl');
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
