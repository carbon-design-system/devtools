import React from "react";
import { settings } from 'carbon-components';

const { prefix } = settings;

function Grid () {
    return (
        <div className={`${prefix}--popup-grid`}>
            Grid
        </div>
    );
}

export { Grid };