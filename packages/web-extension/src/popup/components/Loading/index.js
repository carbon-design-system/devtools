import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import SkeletonPlaceholder from 'carbon-components-react/es/components/SkeletonPlaceholder';

const { prefix } = settings;

function Loading() {
  return <SkeletonPlaceholder className={`${prefix}--popup-loading`} />;
}

export { Loading };
