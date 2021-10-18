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

const { _stats, ...components } = buildReactComponentList(
  componentList,
  prefix,
  mockedProps,
  customComps,
  filterByTheseComponents
);

const carbonReact = {
  name: 'Carbon',
  components,
  _stats,
};

export { carbonReact };
