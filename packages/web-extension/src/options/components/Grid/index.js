import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Select from 'carbon-components-react/es/components/Select';
import SelectItem from 'carbon-components-react/es/components/SelectItem';
import { configuration } from '../';
import { gridVersions } from '../../../globals/options';
import { defaults } from '../../../globals/defaults';

const { prefix } = settings;
const gridVersionList = Object.keys(gridVersions);

function Grid({ gridVersion = defaults.gridVersion }) {
  return (
    <div>
      <Select
        size="sm"
        labelText="Choose a grid"
        className={`${prefix}--options__select`}
        onChange={(e) =>
          configuration('grid-version', { gridVersion: e.target.value })
        }>
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
