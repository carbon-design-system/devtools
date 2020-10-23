import React from "react";
import { settings } from 'carbon-components';
import { Information16 } from '@carbon/icons-react';

const { prefix } = settings;

function labelMaker (labelText) {
    return (
        <>
            {labelText}
            {/*<button 
                className={`${prefix}--popup-main__info`}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <Information16 />
            </button>*/}
        </>
    );
}

export { labelMaker };