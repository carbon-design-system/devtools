import React, { useEffect, useState } from "react";
import { settings } from 'carbon-components';
import { sendTabMessage, getMessage, gaNavigationEvent, gaDomEvent } from '../../../utilities';
import { Button } from 'carbon-components-react';
import { ChevronLeft16 } from '@carbon/icons-react';

import { ComingSoon } from '../';

const { prefix } = settings;

function Validation ({ panelControls }) {
    const [pageGrades, setPageGrades] = useState({});
    
    useEffect(() => {
        sendTabMessage(-1, { requestPageGrade: true });
        
        getMessage((msg, sender, sendResponse) => {
            if (msg.pageGrades) {
                setPageGrades(msg.pageGrades);
            }
        });
    }, []);

    return (
        <>
            <Button
                kind='secondary'
                onClick={() => panelControls.close('validate')}
            >
                <ChevronLeft16 style={{ marginRight: 8 }} />
                Back
            </Button>
            <p>{JSON.stringify(pageGrades)}</p>
        </>
    );
}

export { Validation };