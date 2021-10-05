import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import { activeTab } from '@carbon/devtools-utilities';
import { Accordion, AccordionItem, Toggle } from 'carbon-components-react';
import { Inventory, Specs, Grid, ResizeBrowser } from '../';
import {
  setStorage,
  getStorage,
  experimentalFlag,
  gaNavigationEvent,
  gaConfigurationEvent,
} from '@carbon/devtools-utilities';

const { prefix } = settings;
const defaults = {
  gridoverlay: true,
};

// can we get defaults before settings state? Maybe via a prop from higher up?
function Main({ initialMsg, _panelControls }) {
  const [globalToggleStates, setGlobalToggleStates] = useState(defaults);
  const [isOpenStates, setIsOpenStates] = useState(defaults);
  const [onLoad, setOnLoad] = useState(false);

  /* temporary groups,
       figure this out this shouldn't be defined here?
       for some reason imports come back undefined outside of Main()
       Need a better way to loop through and name panels/groups from line 4 */
  const groups = {};
  // experimentalFlag(() => {  });
  groups['Component list'] = Inventory;
  groups['Specs'] = Specs;
  groups['Grid overlay'] = Grid;

  const groupsList = Object.keys(groups);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'globalToggleStates';
    getStorage([dataKey], (dataReceived) => {
      if (dataReceived && dataReceived[dataKey]) {
        setGlobalToggleStates(dataReceived[dataKey]);
      }
      setOnLoad(true);
    });
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ globalToggleStates });
    }
  });

  useEffect(() => {
    // stop toggle bubbling, allows us to add a toggle to the accordion button
    const toggles = document.querySelectorAll(`.${prefix}--popup-main__toggle`);

    toggles.forEach((toggle) => {
      toggle.removeEventListener('click', stopBubble);
      toggle.addEventListener('click', stopBubble);
    });
  });

  return (
    <>
      <ResizeBrowser windowWidth={initialMsg.windowWidth} />
      <Accordion className={`${prefix}--popup-main`}>
        {experimentalFlag(() => (
          <AccordionItem
            title={'Validate page'}
            className={`${prefix}--popup-main__item ${prefix}--popup-main__validate`}
            onHeadingClick={() => validatePageWithBeacon()}
          />
        ))}
        {groupsList.map((groupName) =>
          renderAccordionItem(groupName, groups[groupName])
        )}
      </Accordion>
    </>
  );

  function stopBubble(e) {
    e.stopPropagation();
  }

  function renderAccordionItem(title, Content) {
    const id = title.replace(' ', '').toLowerCase();
    const codename = title.replace(' ', '-').toLowerCase();

    return !onLoad ? null : (
      <AccordionItem
        className={`${prefix}--popup-main__item`}
        open={globalToggleStates[id]}
        onHeadingClick={(val) => {
          const changes = { ...globalToggleStates };
          changes[id] = val.isOpen;
          setIsOpenStates(changes);
          gaNavigationEvent('toggle', codename, val.isOpen);
        }}
        title={
          ['componentlist'].indexOf(id) > -1 ? (
            title
          ) : (
            <div className={`${prefix}--row`}>
              <div className={`${prefix}--col-sm-2`}>{title}</div>
              <div className={`${prefix}--col-sm-2`}>
                <Toggle
                  size="sm"
                  id={id}
                  className={`${prefix}--popup-main__toggle`}
                  toggled={globalToggleStates[id]}
                  onToggle={(e) => {
                    const changes = { ...globalToggleStates };
                    changes[id] = e;
                    setGlobalToggleStates(changes);
                    setIsOpenStates(changes);
                    gaConfigurationEvent('global-change', codename, e);
                  }}
                />
              </div>
            </div>
          )
        }
      >
        <Content disabled={!globalToggleStates[id]} isOpen={isOpenStates[id]} />
      </AccordionItem>
    );
  }
}

function validatePageWithBeacon() {
  const beaconURL =
    'https://beacon-for-ibm-dotcom-api.herokuapp.com/?raw=true&url=';
  activeTab((tab) => {
    chrome.tabs.create({ url: beaconURL + tab.url });
    gaNavigationEvent('click', 'beacon', 1);
  });
}

Main.propTypes = {
  _panelControls: PropTypes.func,
  initialMsg: PropTypes.object,
};

export { Main };
