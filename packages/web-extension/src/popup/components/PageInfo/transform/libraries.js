function formLibraryRows(data) {
  const rows = [];
  const northstar = data.Northstar;
  const libraries = data.libraries;
  const libraryKeys = Object.keys(libraries);

  if (northstar) {
    rows.push({
      title: 'Northstar',
      type: 'code',
      subtitle: `${northstar.numOfFiles} file${
        northstar.numOfFiles > 1 ? 's' : ''
      }`,
      value: Object.keys(northstar.versions),
    });
  }

  if (libraryKeys.length) {
    libraryKeys.forEach((name) => {
      let value = String(libraries[name]).toLowerCase();

      // TODO: unify and sanitize string? (e.g. carbon for IBM.com v10.2.0, v5.28.0, 5.8.1, v19);

      rows.push({
        title: name,
        type: 'code',
        value: value,
      });
    });
  }

  return rows;
}

export { formLibraryRows };
