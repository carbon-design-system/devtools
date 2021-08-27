import React from 'react';
import { settings } from 'carbon-components';
import { Link } from 'carbon-components-react';
import { gaNavigationEvent } from '@carbon/devtools-utilities';
import {
  name,
  version,
  bugs,
  repository,
  dependencies,
} from '../../../../package.json';

const { prefix } = settings;

function formatVersion(version) {
  return `v${version}`;
}

function getMajorVersion(dependency) {
  return dependencies[dependency].split('.')[0];
}

function normalizeSemVer(version) {
  return version.replace('^', '');
}

const CLOUD_COGNITIVE = '@carbon/ibm-cloud-cognitive';

const packages = [
  { name, version },
  {
    name: 'carbon',
    version: normalizeSemVer(getMajorVersion('carbon-components')),
  },
  {
    name: CLOUD_COGNITIVE,
    version: normalizeSemVer(dependencies[CLOUD_COGNITIVE]),
  },
  {
    name: 'ibm.com library',
    version: normalizeSemVer(getMajorVersion('@carbon/ibmdotcom-react')),
  },
  {
    name: 'ibm security',
    version: normalizeSemVer(getMajorVersion('@carbon/ibm-security')),
  },
];

function Footer() {
  return (
    <footer className={`${prefix}--row`}>
      <ul className={`${prefix}--options__meta ${prefix}--col`}>
        {packages.map(({ name, version }, id) => (
          <li key={`list-item--${id}`}>
            {name} {formatVersion(version)}
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
