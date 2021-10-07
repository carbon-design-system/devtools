import React from 'react';
// import settings from 'carbon-components/es/globals/js/settings';

// const { prefix } = settings;

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
