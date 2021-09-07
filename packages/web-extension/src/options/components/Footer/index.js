import { gaNavigationEvent } from '@carbon/devtools-utilities';
import { settings } from 'carbon-components';
import { Link } from 'carbon-components-react';
import React from 'react';

import {
  name,
  version,
  bugs,
  repository,
  dependencies,
} from '../../../../package.json';

const { prefix } = settings;

function getVersion(dependency) {
  return `v${dependencies[dependency].replace('^', '')}`;
}

function getMajorVersion(dependency) {
  return getVersion(dependency).split('.')[0];
}

const CLOUD_COGNITIVE = '@carbon/ibm-cloud-cognitive';

const packages = [
  { name, version },
  {
    name: 'carbon',
    version: getMajorVersion('carbon-components'),
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
          <Link
            onClick={() => gaNavigationEvent('click', 'code-repository')}
            href={repository.url}
            target="_blank">
            code repository
          </Link>
        </li>
        <li>
          <Link
            onClick={() => gaNavigationEvent('click', 'submit-an-issue')}
            href={bugs.url}
            target="_blank">
            submit an issue
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export { Footer };
