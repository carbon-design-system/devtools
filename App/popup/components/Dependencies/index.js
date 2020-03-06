import React from "react";
import { settings } from 'carbon-components';

const { prefix } = settings;

function Dependencies () {
    return (
        <div className={`${prefix}--popup-dependencies`}>
            Dependencies
        </div>
    );
}

export { Dependencies };