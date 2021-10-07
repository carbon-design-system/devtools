import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Toggle from 'carbon-components-react/es/components/Toggle';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { gaConfigurationEvent } from '@carbon/devtools-utilities/src/ga';
import { gridVersions } from '../../../globals/options';
import { defaults } from '../../../globals/defaults';
import { Grid2xOptions } from './Grid2xOptions';
import { GridMiniUnitOptions } from './GridMiniUnitOptions';

const { prefix } = settings;

function Grid({ disabled }) {
  const [toggleGrids, setToggleGrids] = useState(defaults.grid);
  const [gridVersionTitle, setGridVersionTitle] = useState(
    gridVersions[Object.keys(gridVersions)[0]]
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
        setGridVersionTitle(gridVersions[gridVersion]);
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
