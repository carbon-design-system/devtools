import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import { breakpoints, baseFontSize } from '@carbon/layout';
import { remtopx, getMessage, experimentalFlag } from '../../../utilities';

const { prefix } = settings;

function ResizeBrowser () {
    const [breakpointIndex, setBreakpointIndex] = useState(false);
    const breakpointKeys = Object.keys(breakpoints);

    useEffect(() => {
        getMessage(({ windowWidth }) => {
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

                setBreakpointIndex(selectedIndex);
            }
        });
    }, []);

    return experimentalFlag(() => (
        <div className={`${prefix}--popup-resize-browser ${prefix}--row`}>
            <div className={`${prefix}--col`}>
                <p className={`${prefix}--popup-resize-browser__label`}>Resize browser</p>
                {breakpointIndex === false ? null : (<ContentSwitcher onChange={resizeBrowser} selectedIndex={breakpointIndex}>
                    {breakpointKeys.map((breakpointKey, i) => {
                        return (
                            <Switch
                                key={breakpointKey + i}
                                name={remtopx(breakpoints[breakpointKey].width)}
                                text={breakpointKey} />
                        );
                    })}
                </ContentSwitcher>)}
            </div>
        </div>
    ));
}

function resizeBrowser ({ name: width }) {
    // should this be a utility?
    chrome.windows.update(-2, { width: width });
}

export { ResizeBrowser };