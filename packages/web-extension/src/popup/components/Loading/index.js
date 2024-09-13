import React from 'react';
import * as settings from '@carbon/web-components/es/globals/settings.js';
import { SkeletonPlaceholder } from '@carbon/react';

const { prefix } = settings;

function Loading() {
  return <SkeletonPlaceholder className={`${prefix}--popup-loading`} />;
}

export { Loading };
