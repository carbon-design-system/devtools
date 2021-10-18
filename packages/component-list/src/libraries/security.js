import React from 'react';
import * as securityComponentList from '@carbon/ibm-security';
import * as carbonComponentList from 'carbon-components-react';
import { getSecurityPrefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { buildReactComponentList } from '../helpers.js';

// can we remove identical components from carbon-react?
const componentList = {};

// filtering out carbon components already being tracked in ./carbon.js
Object.keys(securityComponentList).forEach((key) => {
  if (!carbonComponentList[key]) {
    componentList[key] = securityComponentList[key];
  }
});

const prefix = getSecurityPrefix('');

const mockedProps = {
  // pageSizes: [0],
  profile: {
    name: {
      first_name: '',
      surname: '',
    },
  },
  items: [],
  labels: {
    mainNavigation: { ariaLabel: '' },
    menu: { button: '' },
  },
  title: 'asdf',
  closeButton: { onClick: () => {} },
  primaryButton: { onClick: () => {} },
  secondaryButton: { onClick: () => {} },
};

const customComps = [(Comp) => <Comp>{() => ''}</Comp>];

const filterByTheseComponents = []; // compKey/name for debugging

const { _stats, ...components } = buildReactComponentList(
  componentList,
  prefix,
  mockedProps,
  customComps,
  filterByTheseComponents
);

const security = {
  name: 'IBM security',
  components,
  _stats,
};

export { security };
