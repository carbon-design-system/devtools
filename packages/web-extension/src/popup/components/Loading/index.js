import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { SkeletonPlaceholder } from 'carbon-components-react';

const { prefix } = settings;

function Loading () {
    return <SkeletonPlaceholder className={`${prefix}--popup-loading`} />;
}

export { Loading };