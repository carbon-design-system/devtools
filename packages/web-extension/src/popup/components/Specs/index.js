import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import settings from 'carbon-components/es/globals/js/settings';

import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { defaults } from '../../../globals/defaults';

import {
  Checkbox,
  TileGroup,
  RadioTile
} from "@carbon/react";
import {
  ColorPalette,
  TextScale,
  Grid,
  VirtualColumn,
  ParentChild,
  Scale
} from "@carbon/icons-react";

const { prefix } = settings;

function Specs({ disabled }) {
  const [toggleSpecs, setToggleSpecs] = useState(defaults.specs);
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
            }}>
            <RadioTile
              disabled={disabled}
              id="specsColor"
              name="specs"
              value="color">
              <ColorPalette
                size="32"
                className={`${prefix}--popup__specs-icon`}
              />
              Color
            </RadioTile>
            <RadioTile
              disabled={disabled}
              id="specsDependencies"
              name="specs"
              value="dependencies">
              <ParentChild
                size="32"
                className={`${prefix}--popup__specs-icon`}
              />
              Dependencies
            </RadioTile>
            <RadioTile
              disabled={disabled}
              id="specsGrid"
              name="specs"
              value="grid">
              <Grid size="32" className={`${prefix}--popup__specs-icon`} />
              Grid
            </RadioTile>
            <RadioTile
              disabled={disabled}
              id="specsRatio"
              name="specs"
              value="ratio">
              <Scale size="32" className={`${prefix}--popup__specs-icon`} />
              Ratio
            </RadioTile>
            <RadioTile
              disabled={disabled}
              id="specsSpacing"
              name="specs"
              value="spacing">
              <VirtualColumn
                size="32"
                className={`${prefix}--popup__specs-icon`}
              />
              Spacing
            </RadioTile>
            <RadioTile
              disabled={disabled}
              id="specsTypography"
              name="specs"
              value="typography">
              <TextScale size="32" className={`${prefix}--popup__specs-icon`} />
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
