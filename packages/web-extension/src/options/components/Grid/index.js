import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import { Select, SelectItem } from 'carbon-components-react';
import { configuration } from '../';
import { gridVersions } from '../../../globals';

const { prefix } = settings;
const gridVersionList = Object.keys(gridVersions);

function Grid({ gridVersion = 'carbon-v10' }) {
  return (
    <div>
      <Select
        size="sm"
        labelText="Choose a grid"
        className={`${prefix}--options__select`}
        onChange={(e) =>
          configuration('grid-version', { gridVersion: e.target.value })
        }
      >
        {gridVersionList.map((gridVersionItem, i) => {
          return (
            <SelectItem
              key={gridVersionItem + i}
              value={gridVersionItem}
              text={gridVersions[gridVersionItem]}
              selected={gridVersion === gridVersionItem ? true : false}
            />
          );
        })}
      </Select>
    </div>
  );
}

Grid.propTypes = {
  gridVersion: PropTypes.string,
};

export { Grid };
