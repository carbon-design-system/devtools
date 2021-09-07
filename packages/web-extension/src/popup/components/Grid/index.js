import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import {
  setStorage,
  getStorage,
  gaConfigurationEvent,
} from '@carbon/devtools-utilities';
import { Toggle } from 'carbon-components-react';
import { Grid2xOptions } from './Grid2xOptions';
import { GridMiniUnitOptions } from './GridMiniUnitOptions';

const { prefix } = settings;

const gridVersionTitles = {
  'carbon-v10': '2x grid',
  'carbon-v9': 'v9 grid',
};

const defaults = {
  toggle2xGrid: true,
};

function Grid({ disabled }) {
  const [toggleGrids, setToggleGrids] = useState(defaults);
  const [gridVersionTitle, setGridVersionTitle] = useState(
    gridVersionTitles['carbon-v10']
  );
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'toggleGrids';
    getStorage([dataKey], (dataReceived) => {
      if (dataReceived && dataReceived[dataKey]) {
        setToggleGrids(dataReceived[dataKey]);
      }
      setOnLoad(true);
    });

    // gets and sets the grid version title
    getStorage(['gridVersion'], ({ gridVersion }) => {
      if (gridVersion) {
        setGridVersionTitle(gridVersionTitles[gridVersion]);
      }
    });
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ toggleGrids });
    }
  });

  return !onLoad ? null : (
    <>
      <section className={`${prefix}--popup-main__section`}>
        <div className={`${prefix}--row`}>
          <div className={`${prefix}--col-sm-2`}>
            <h2 className={`${prefix}--popup-main__section-title`}>
              {gridVersionTitle}
            </h2>
          </div>
          <div className={`${prefix}--col-sm-2`}>
            <Toggle
              size="sm"
              className={`${prefix}--popup-main__section-toggle`}
              disabled={disabled}
              id="toggle2xGrid"
              toggled={toggleGrids['toggle2xGrid']}
              onToggle={(e) => {
                const changes = { ...toggleGrids };
                changes['toggle2xGrid'] = e;
                setToggleGrids(changes);
                gaConfigurationEvent('2x-grid-change', 'global', e);
              }}
            />
          </div>
        </div>
        <Grid2xOptions disabled={disabled || !toggleGrids['toggle2xGrid']} />
      </section>
      <section className={`${prefix}--popup-main__section`}>
        <div className={`${prefix}--row`}>
          <div className={`${prefix}--col-sm-2`}>
            <h2 className={`${prefix}--popup-main__section-title`}>
              Mini units
            </h2>
          </div>
          <div className={`${prefix}--col-sm-2`}>
            <Toggle
              size="sm"
              className={`${prefix}--popup-main__section-toggle`}
              disabled={disabled}
              id="toggleMiniUnitGrid"
              toggled={toggleGrids['toggleMiniUnitGrid']}
              onToggle={(e) => {
                const changes = { ...toggleGrids };
                changes['toggleMiniUnitGrid'] = e;
                setToggleGrids(changes);
                gaConfigurationEvent('mini-unit-grid-change', 'global', e);
              }}
            />
          </div>
        </div>
        <GridMiniUnitOptions
          disabled={disabled || !toggleGrids['toggleMiniUnitGrid']}
        />
      </section>
    </>
  );
}

Grid.propTypes = {
  disabled: PropTypes.bool,
};

export { Grid };
