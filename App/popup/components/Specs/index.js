import React from "react";
import { settings } from 'carbon-components';

const { prefix } = settings;

function Specs () {
    return (
        <div className={`${prefix}--popup-specs`}>
            Specs
        </div>
    );
}

export { Specs };