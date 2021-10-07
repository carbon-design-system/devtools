import * as componentList from 'carbon-components-react';
import { carbonPrefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { buildReactComponentList } from '../helpers.js';

const prefix = carbonPrefix + '--';

const mockedProps = {
  pageSizes: [0],
  items: [],
};

const customComps = [];

const filterByTheseComponents = []; // compKey/name for debugging

const carbonReact = buildReactComponentList(
  componentList,
  prefix,
  mockedProps,
  customComps,
  filterByTheseComponents
);

export { carbonReact };
