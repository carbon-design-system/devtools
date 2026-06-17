import {
  libraries,
  _results,
} from '@carbon/devtools-component-list/dist/index.json';

const libraryKeys = Object.keys(libraries);
const allComponents = {};

libraryKeys.forEach((key) => {
  Object.assign(allComponents, libraries[key].components);
});

// Per-version component maps for Carbon v10 and v11
const v10Components = libraries.carbonReact
  ? { ...libraries.carbonReact.components }
  : {};
const v11Components = libraries.carbonReactV11
  ? { ...libraries.carbonReactV11.components }
  : {};

export { allComponents, v10Components, v11Components };
