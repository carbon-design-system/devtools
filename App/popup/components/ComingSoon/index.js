import React from "react";
import { settings } from 'carbon-components';
import { Sprout32 } from '@carbon/icons-react';

const { prefix } = settings;

function ComingSoon () {
    return (
        <div style={{textAlign: 'center'}}>
            <p>
                <Sprout32 />
            </p>
            <p>Coming soon!</p>
        </div>
    );
}

export { ComingSoon };