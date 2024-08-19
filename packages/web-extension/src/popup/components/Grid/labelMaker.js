import React from 'react';
// import { prefix } from '@carbon/web-components/es/globals/settings.js';

// 

function labelMaker(labelText) {
  return (
    <>
      {labelText}
      {/*<button 
                className={`${prefix}--popup-main__info`}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
            </button>*/}
    </>
  );
}

export { labelMaker };
