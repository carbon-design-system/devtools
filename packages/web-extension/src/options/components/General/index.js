import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Select from 'carbon-components-react/es/components/Select';
import SelectItem from 'carbon-components-react/es/components/SelectItem';
import Toggle from 'carbon-components-react/es/components/Toggle';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { configuration } from '../';
import { themes } from '@carbon/themes';
import { defaults } from '../../../globals/defaults';

const { prefix } = settings;
const themeList = Object.keys(themes);

function General({
  generalExperimental,
  generalNonCarbon,
  generalTheme = defaults.generalSettings.theme,
}) {
  return (
    <>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-2`}>
          <Toggle
            size="sm"
            labelText="Non-carbon pages"
            className={`${prefix}--options__non-carbon`}
            id="nonCarbon"
            toggled={generalNonCarbon}
            onChange={(e) => {
              configuration('general-ignore-validation', {
                generalNonCarbon: e.target.checked,
              });
              setStorage({ generalNonCarbonClear: false });
            }}
          />
        </div>
        <div className={`${prefix}--col-sm-2`}>
          <Toggle
            size="sm"
            labelText="Experimental features"
            className={`${prefix}--options__experimental`}
            id="experimental"
            toggled={generalExperimental}
            onChange={(e) => {
              configuration('general-experimental', {
                generalExperimental: e.target.checked,
              });
            }}
          />
        </div>
      </div>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-2`}>
          <Select
            size="sm"
            onChange={(e) =>
              configuration('general-theme', { generalTheme: e.target.value })
            }
            labelText="Choose a theme"
            className={`${prefix}--options__select`}>
            <SelectItem
              value={'system'}
              text={'system'}
              selected={'system' === generalTheme ? true : false}
            />
            {themeList.map((theme, i) => (
              <SelectItem
                key={theme + i}
                value={theme}
                text={theme}
                selected={theme === generalTheme ? true : false}
              />
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}

General.propTypes = {
  generalExperimental: PropTypes.bool,
  generalNonCarbon: PropTypes.bool,
  generalTheme: PropTypes.string,
};

export { General };
