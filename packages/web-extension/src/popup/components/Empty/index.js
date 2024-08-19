import React from 'react';
import { prefix } from '@carbon/web-components/es/globals/settings.js';
import packageJSON from '../../../../package.json';
import Link from '@carbon/react/es/components/Link';



function Empty() {
  return (
    <div className={`${prefix}--popup-empty`}>
      <h2 className={`${prefix}--popup-empty__heading`}>Carbon not found</h2>
      <p className={`${prefix}--popup-empty__copy`}>
        We could not find Carbon being used on this page. If you believe this to
        be in error please{' '}
        <Link href={packageJSON.bugs.url} target="_blank">
          submit an issue
        </Link>
        .
      </p>
    </div>
  );
}

export { Empty };
