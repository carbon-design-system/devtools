import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import { breakpoints, baseFontSize } from '@carbon/layout';
import { remtopx, getMessage } from '../../../utilities';

const { prefix } = settings;
const breakpointKeys = Object.keys(breakpoints);

function ResizeBrowser ({ windowWidth = 0 }) {
    const [breakpointIndex, setBreakpointIndex] = useState(false);

    return (
        <div className={`${prefix}--popup-resize-browser ${prefix}--row`}>
            <div className={`${prefix}--col`}>
                <p className={`${prefix}--popup-resize-browser__label`}>Resize browser</p>
                <ContentSwitcher onChange={resizeBrowser} selectedIndex={getBreakpointIndex(windowWidth)}>
                    {breakpointKeys.map((breakpointKey, i) => {
                        return (
                            <Switch
                                key={breakpointKey + i}
                                name={remtopx(breakpoints[breakpointKey].width)}
                                text={breakpointKey} />
                        );
                    })}
                </ContentSwitcher>
            </div>
        </div>
    );
}

function getBreakpointIndex (windowWidth) {
    if (windowWidth) {
        let selectedIndex = 0;
        let breakpointKey, i;
    
        for (i = 0; i < breakpointKeys.length; i++) {
            breakpointKey = breakpointKeys[i];
    
            if (windowWidth >= remtopx(breakpoints[breakpointKey].width)) {
                selectedIndex = i;
            } else {
                break;
            }
        }
    
        return selectedIndex; // setBreakpointIndex(selectedIndex);
    }
}

function resizeBrowser ({ name: width }) {
    // should this be a utility?
    chrome.windows.update(-2, { width: width });
}

export { ResizeBrowser };