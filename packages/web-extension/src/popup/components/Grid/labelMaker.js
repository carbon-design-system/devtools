import React from 'react';
import * as settings from '@carbon/web-components/es/globals/settings.js';

const { prefix } = settings;

function labelMaker(labelText) {
  return (
    <>
      {labelText}
      <button
        type="button"
        className={`${prefix}--popup-main__info`}
        onClick={(e) => {
          e.stopPropagation();
        }}></button>
    </>
  );
}

export { labelMaker };
