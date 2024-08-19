import React from 'react';
import { prefix } from '@carbon/web-components/es/globals/settings.js';
import SkeletonPlaceholder from 'carbon-components-react/es/components/SkeletonPlaceholder';



function Loading() {
  return <SkeletonPlaceholder className={`${prefix}--popup-loading`} />;
}

export { Loading };
