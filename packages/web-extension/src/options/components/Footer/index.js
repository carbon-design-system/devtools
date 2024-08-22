import { prefix } from '@carbon/web-components/es/globals/settings.js';
import Link from '@carbon/react/es/components/Link/Link';
import React from 'react';

import packageJSON from '../../../../package.json';


const { name, version, bugs, repository, dependencies } = packageJSON;

function getVersion(dependency) {
  return `v${dependencies[dependency].replace('^', '')}`;
}

function getMajorVersion(dependency) {
  return getVersion(dependency).split('.')[0];
}

const CLOUD_COGNITIVE = '@carbon/ibm-products';

const packages = [
  { name, version },
  {
    name: 'carbon',
    version: getMajorVersion('@carbon/react'),
  },
  {
    name: CLOUD_COGNITIVE,
    version: getVersion(CLOUD_COGNITIVE),
  },

  {
    name: 'ibm.com library',
    version: getMajorVersion('@carbon/ibmdotcom-react'),
  },
  {
    name: 'ibm security',
    version: getMajorVersion('@carbon/ibm-security'),
  },
];

function Footer() {
  return (
    <footer className={`${prefix}--row`}>
      <ul className={`${prefix}--options__meta ${prefix}--col`}>
        {packages.map(({ name, version }, id) => (
          <li key={`list-item--${id}`}>
            {name} {version}
          </li>
        ))}

        <li>
          <Link href={repository.url} target="_blank">
            code repository
          </Link>
        </li>
        <li>
          <Link href={bugs.url} target="_blank">
            submit an issue
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export { Footer };
