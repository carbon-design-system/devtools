import carbonLibraries from '@carbon/devtools-component-list/dist/index.json';

const libraries = Object.keys(carbonLibraries);
const allComponents = {};

libraries.forEach((key) => {
  Object.assign(allComponents, carbonLibraries[key]);
});

export { allComponents };
