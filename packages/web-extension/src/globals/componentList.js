import { libraries } from '@carbon/devtools-component-list/dist/index.json';

const libraryKeys = Object.keys(libraries);
const allComponents = {};

libraryKeys.forEach((key) => {
  Object.assign(allComponents, libraries[key]);
});

console.log(allComponents);

export { allComponents };
