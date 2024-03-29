import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

function formLibraryRows(data, _inventoryData = {}) {
  const rows = [];
  const northstar = data.Northstar;
  const libraries = data.libraries;
  const libraryKeys = Object.keys(libraries);
  const { _results, _totals, libraries: carbonLibraries } = _inventoryData;

  const carbonKeys = Object.keys(carbonLibraries || {});

  if (carbonKeys.length) {
    carbonKeys.forEach((libraryId) => {
      const library = carbonLibraries[libraryId];
      const unique = safeObj(`${libraryId}.unique`, _results) || '';

      rows.push({
        title: library.name,
        type: 'code',
        subtitle: `${unique} component${unique > 1 ? 's' : ''}`,
        subtitleTitle: `${unique} of ${library.name}'s ${_totals[libraryId].total} components`,
        value: 'true',
      });
    });
  }

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
      let value = libraries[name];

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
