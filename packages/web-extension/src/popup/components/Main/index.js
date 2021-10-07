import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Accordion, {
  AccordionItem,
} from 'carbon-components-react/es/components/Accordion';
import Toggle from 'carbon-components-react/es/components/Toggle';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { experimentalFlag } from '@carbon/devtools-utilities/src/experimental';
import {
  gaNavigationEvent,
  gaConfigurationEvent,
} from '@carbon/devtools-utilities/src/ga';
import { defaults } from '../../../globals/defaults';
import { Inventory, Specs, Grid, ResizeBrowser, PageInfo } from '../';

const { prefix } = settings;

// can we get defaults before settings state? Maybe via a prop from higher up?
function Main({ initialMsg, _panelControls }) {
  const [globalToggleStates, setGlobalToggleStates] = useState(defaults.global);
  const [isOpenStates, setIsOpenStates] = useState(defaults.global);
  const [onLoad, setOnLoad] = useState(false);

  /* temporary groups,
       figure this out this shouldn't be defined here?
       for some reason imports come back undefined outside of Main()
       Need a better way to loop through and name panels/groups from line 4 */
  const groups = {};

  // experimentalFlag(() => {
  //     groups['Page info'] = ComingSoon;
  // });

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
        {groupsList.map((groupName) =>
          renderAccordionItem(groupName, groups[groupName])
        )}
        {experimentalFlag(() => (
          <AccordionItem
            title={'Page info'}
            className={`${prefix}--popup-main__item ${prefix}--popup-main__panel`}
            onHeadingClick={() =>
              _panelControls.open(
                'Page info',
                <PageInfo _panelControls={_panelControls} />
              )
            }
          />
        ))}
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

Main.propTypes = {
  _panelControls: PropTypes.func,
  initialMsg: PropTypes.object,
};

export { Main };
