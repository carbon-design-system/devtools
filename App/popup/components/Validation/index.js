import React from "react";
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import { ChevronLeft16 } from '@carbon/icons-react';

import { ComingSoon } from '../';

const { prefix } = settings;

function Validation ({ panelControls }) {
    return (
        <>
            <Button
                kind='secondary'
                onClick={() => panelControls.close('validate')}
            >
                <ChevronLeft16 style={{ marginRight: 8 }} />
                Back
            </Button>
            <ComingSoon />
        </>
    );
}

export { Validation };