import React from 'react';
import { settings } from 'carbon-components';
import { Select, SelectItem } from 'carbon-components-react';
import { configuration } from '../';
import { gridVersions } from '@carbon/devtools-token-server';

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

export { Grid };
