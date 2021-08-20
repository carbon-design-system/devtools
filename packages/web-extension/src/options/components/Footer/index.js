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

function normalizeSemVer(version) {
  return version.replace('^', '');
}

const CARBON_VERSION = normalizeSemVer(
  dependencies['@carbon/grid'].split('.')[0]
);

const DOTCOM_VERSION = normalizeSemVer(
  dependencies['@carbon/ibmdotcom-react'].split('.')[0]
);

const CLOUD_COGNITIVE = '@carbon/ibm-cloud-cognitive';

const SECURITY_VERSION = normalizeSemVer(
  dependencies['@carbon/ibm-security'].split('.')[0]
);

function Footer() {
  return (
    <footer className={`${prefix}--row`}>
      <ul className={`${prefix}--options__meta ${prefix}--col`}>
        <li>
          {name} v{version}
        </li>
        <li>carbon v{CARBON_VERSION}</li>

        <li>
          {CLOUD_COGNITIVE} {normalizeSemVer(dependencies[CLOUD_COGNITIVE])}
        </li>

        <li>ibm.com library v{DOTCOM_VERSION}</li>
        <li>ibm security v{SECURITY_VERSION}</li>
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
