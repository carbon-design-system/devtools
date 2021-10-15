import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import ContentSwitcher from 'carbon-components-react/es/components/ContentSwitcher';
import Switch from 'carbon-components-react/es/components/Switch';
import Checkbox from 'carbon-components-react/es/components/Checkbox';
import { breakpoints } from '@carbon/layout';
import { remtopx } from '@carbon/devtools-utilities/src/remtopx';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { gaConfigurationEvent } from '@carbon/devtools-utilities/src/ga';
import { labelMaker } from '../Grid/labelMaker'; // needs to go in a utility or something

const { prefix } = settings;
const breakpointKeys = Object.keys(breakpoints);

function ResizeBrowser({ windowWidth = 0 }) {
  const [toggleBreakpointLabel, setToggleBreakpointLabel] = useState(true);
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'toggleBreakpointLabel';
    getStorage([dataKey], (dataReceived) => {
      // should this be passed in via props?
      if (dataReceived && typeof dataReceived[dataKey] === 'boolean') {
        setToggleBreakpointLabel(dataReceived[dataKey]);
      }

      setOnLoad(true);
    });
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ toggleBreakpointLabel });
    }
  });

  return (
    <div className={`${prefix}--popup-resize-browser__container`}>
      <div className={`${prefix}--popup-resize-browser ${prefix}--row`}>
        <div className={`${prefix}--col`}>
          <p className={`${prefix}--popup-resize-browser__label`}>
            Resize browser
          </p>
          <ContentSwitcher
            onChange={resizeBrowser}
            selectedIndex={getBreakpointIndex(windowWidth)}
            selectionMode="manual"
          >
            {breakpointKeys.map((breakpointKey, i) => {
              return (
                <Switch
                  key={breakpointKey + i}
                  name={remtopx(breakpoints[breakpointKey].width)}
                  text={breakpointKey}
                />
              );
            })}
          </ContentSwitcher>
        </div>
      </div>
      {!onLoad ? null : (
        <div className={`${prefix}--row`}>
          <div className={`${prefix}--col`}>
            <Checkbox
              labelText={labelMaker('Breakpoint label')}
              id="toggleBreakpointLabel"
              checked={toggleBreakpointLabel}
              onChange={(e) => {
                setToggleBreakpointLabel(e);
                gaConfigurationEvent(
                  '2x-grid-change',
                  '2x-breapoints-label',
                  e
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function getBreakpointIndex(windowWidth) {
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

    return selectedIndex;
  }
}

function resizeBrowser({ text, name: width }) {
  // should this be a utility?
  chrome.windows.update(-2, { width: width });
  gaConfigurationEvent('browser-resize-change', text, width);
}

ResizeBrowser.propTypes = {
  windowWidth: PropTypes.number,
};

export { ResizeBrowser };
