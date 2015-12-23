Settings.permit('insert').apply();
Settings.permit('update').apply();

// Don't allow any change in production settings from the client. We use the
// 'ApplySettings' method to overwrite the changes.
ProductionSettings.permit(['insert', 'update', 'remove']).never().apply();
