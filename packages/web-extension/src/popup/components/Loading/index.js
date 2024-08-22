import React from 'react';
import { prefix } from '@carbon/web-components/es/globals/settings.js';
import SkeletonPlaceholder from '@carbon/react/es/components/SkeletonPlaceholder/SkeletonPlaceholder';



function Loading() {
  return <SkeletonPlaceholder className={`${prefix}--popup-loading`} />;
}

export { Loading };
