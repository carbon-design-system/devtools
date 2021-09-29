import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { settings } from 'carbon-components';

import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { experimentalFlag } from '@carbon/devtools-utilities/src/experimental';
import { gaConfigurationEvent } from '@carbon/devtools-utilities/src/ga';

import Checkbox from 'carbon-components-react/es/components/Checkbox';
import TileGroup from 'carbon-components-react/es/components/TileGroup';
import RadioTile from 'carbon-components-react/es/components/RadioTile';

import ColorPalette32 from '@carbon/icons-react/es/color-palette/32';
import TextScale32 from '@carbon/icons-react/es/text--scale/32';
import Grid32 from '@carbon/icons-react/es/grid/32';
import VirtualColumn32 from '@carbon/icons-react/es/virtual-column/32';
import ParentChild32 from '@carbon/icons-react/es/parent-child/32';
import Scale32 from '@carbon/icons-react/es/scale/32';

const { prefix } = settings;

const defaults = {
  type: 'typography',
  outline: true,
};

function Specs({ disabled }) {
  const [toggleSpecs, setToggleSpecs] = useState(defaults);
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'toggleSpecs';
    getStorage([dataKey], (dataReceived) => {
      if (dataReceived && dataReceived[dataKey]) {
        setToggleSpecs(dataReceived[dataKey]);
      }
      setOnLoad(true);
    });
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ toggleSpecs });
    }
  });

  return !onLoad ? null : (
    <>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-2`}></div>
        <div className={`${prefix}--col-sm-2`}>
          <Checkbox
            disabled={disabled}
            labelText={'Outline'}
            id="specsOutline"
            className={`${prefix}--popup__specs-outline`}
            checked={toggleSpecs.outline}
            onChange={(e) => {
              const changes = { ...toggleSpecs };
              changes.outline = e;
              setToggleSpecs(changes);
              gaConfigurationEvent('specs-change', 'outline', e);
            }}
          />
        </div>
      </div>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-4`}>
          <TileGroup
            defaultSelected={toggleSpecs.type}
            name="specs"
            className={`${prefix}--popup__specs`}
            onChange={(e) => {
              const changes = { ...toggleSpecs };
              changes.type = e;
              setToggleSpecs(changes);
              gaConfigurationEvent('specs-change', e);
            }}
          >
            <RadioTile id="specsColor" name="specs" value="color">
              <ColorPalette32 className={`${prefix}--popup__specs-icon`} />
              Color
            </RadioTile>
            <RadioTile id="specsDependencies" name="specs" value="dependencies">
              <ParentChild32 className={`${prefix}--popup__specs-icon`} />
              Dependencies
            </RadioTile>
            <RadioTile id="specsGrid" name="specs" value="grid">
              <Grid32 className={`${prefix}--popup__specs-icon`} />
              Grid
            </RadioTile>
            {experimentalFlag(() => (
              <RadioTile id="specsRatio" name="specs" value="ratio">
                <Scale32 className={`${prefix}--popup__specs-icon`} />
                Ratio
              </RadioTile>
            ))}
            <RadioTile id="specsSpacing" name="specs" value="spacing">
              <VirtualColumn32 className={`${prefix}--popup__specs-icon`} />
              Spacing
            </RadioTile>
            <RadioTile id="specsTypography" name="specs" value="typography">
              <TextScale32 className={`${prefix}--popup__specs-icon`} />
              Typography
            </RadioTile>
          </TileGroup>
        </div>
      </div>
    </>
  );
}

Specs.propTypes = {
  disabled: PropTypes.bool,
};

export { Specs };
