import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import packageJSON from '../../../../package.json';
import Link from 'carbon-components-react/es/components/Link';
import { gaNavigationEvent } from '@carbon/devtools-utilities/src/ga';

const { prefix } = settings;

function Empty() {
  return (
    <div className={`${prefix}--popup-empty`}>
      <h2 className={`${prefix}--popup-empty__heading`}>Carbon not found</h2>
      <p className={`${prefix}--popup-empty__copy`}>
        We could not find Carbon being used on this page. If you believe this to
        be in error please{' '}
        <Link
          href={packageJSON.bugs.url}
          target="_blank"
          onClick={() =>
            gaNavigationEvent('click', 'submit-an-issue', 1, {
              link_url: packageJSON.bugs.url,
              outbound: true,
            })
          }
        >
          submit an issue
        </Link>
        .
      </p>
    </div>
  );
}

export { Empty };
