import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Checkbox from 'carbon-components-react/lib/components/Checkbox';
import FormGroup from 'carbon-components-react/lib/components/FormGroup';
import NumberInput from 'carbon-components-react/lib/components/NumberInput';
import ContentSwitcher from 'carbon-components-react/lib/components/ContentSwitcher';
import Switch from 'carbon-components-react/lib/components/Switch';
import FormLabel from 'carbon-components-react/lib/components/FormLabel';
import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { gaConfigurationEvent } from '@carbon/devtools-utilities/src/ga';
import { defaults } from '../../../globals/defaults';
import { positions } from '../../../globals/options';
import { labelMaker } from './labelMaker';

const { prefix } = settings;

function Grid2xOptions({ disabled }) {
  const [toggle2xGridOptions, setToggle2xGridOptions] = useState(
    defaults.toggle2x
  );
  const [onLoad, setOnLoad] = useState(false);

  useEffect(() => {
    // get storage and set defaults
    const dataKey = 'toggle2xGridOptions';
    getStorage([dataKey], (dataReceived) => {
      // should this be passed in via props?
      if (dataReceived && dataReceived[dataKey]) {
        setToggle2xGridOptions(dataReceived[dataKey]);
      }

      setOnLoad(true);
    });
  }, []);

  useEffect(() => {
    // update storage
    if (onLoad) {
      setStorage({ toggle2xGridOptions });
    }
  });

  return !onLoad ? null : (
    <FormGroup legendText="Options">
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-2`}>
          <Checkbox
            disabled={disabled}
            labelText={labelMaker('Columns')}
            id="toggle2xColumns"
            checked={toggle2xGridOptions['toggle2xColumns']}
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xColumns'] = e;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent('2x-grid-change', '2x-columns', e);
            }}
          />
        </div>
        <div className={`${prefix}--col-sm-2`}>
          <Checkbox
            disabled={disabled}
            labelText={labelMaker('Gutters')}
            id="toggle2xGutters"
            checked={toggle2xGridOptions['toggle2xGutters']}
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xGutters'] = e;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent('2x-grid-change', '2x-gutters', e);
            }}
          />
        </div>
        <div className={`${prefix}--col-sm-2`}>
          <Checkbox
            disabled={disabled}
            labelText={labelMaker('Borders')}
            id="toggle2xBorders"
            checked={toggle2xGridOptions['toggle2xBorders']}
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xBorders'] = e;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent('2x-grid-change', '2x-borders', e);
            }}
          />
        </div>
        <div className={`${prefix}--col-sm-2`}>
          <Checkbox
            disabled={disabled}
            labelText={labelMaker('Breakpoints')}
            id="toggle2xBreakpoints"
            checked={toggle2xGridOptions['toggle2xBreakpoints']}
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xBreakpoints'] = e;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent('2x-grid-change', '2x-breapoints-label', e);
            }}
          />
        </div>
      </div>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-4`}>
          <FormLabel className={disabled ? `${prefix}--label--disabled` : ''}>
            Position
          </FormLabel>
          <ContentSwitcher
            id="toggle2xPosition"
            size="sm"
            selectionMode="manual"
            selectedIndex={Object.keys(positions).indexOf(
              toggle2xGridOptions['toggle2xPosition']
            )}
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xPosition'] = e.name;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent('2x-grid-change', '2x-position', e.name);
            }}
          >
            {Object.keys(positions).map((position) => {
              const Icon = positions[position];
              return (
                <Switch
                  disabled={disabled}
                  title={position}
                  key={position}
                  name={position}
                  aria-label={position}
                  text={<Icon />}
                />
              );
            })}
          </ContentSwitcher>
        </div>
      </div>
      <div className={`${prefix}--row`}>
        <div className={`${prefix}--col-sm-2`}>
          <NumberInput
            disabled={disabled}
            label={labelMaker('Left influencer')}
            min={0}
            step={8}
            value={toggle2xGridOptions['toggle2xLeftInfluencer']}
            size="sm"
            invalidText="Please input a positive integer"
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xLeftInfluencer'] = e.imaginaryTarget.value || 0;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent(
                '2x-grid-change',
                '2x-left-influencer',
                changes['toggle2xLeftInfluencer']
              );
            }}
          />
        </div>
        <div className={`${prefix}--col-sm-2`}>
          <NumberInput
            disabled={disabled}
            label={labelMaker('Right influencer')}
            min={0}
            step={8}
            value={toggle2xGridOptions['toggle2xRightInfluencer']}
            size="sm"
            invalidText="Please input a positive integer"
            onChange={(e) => {
              const changes = { ...toggle2xGridOptions };
              changes['toggle2xRightInfluencer'] = e.imaginaryTarget.value || 0;
              setToggle2xGridOptions(changes);
              gaConfigurationEvent(
                '2x-grid-change',
                '2x-right-influencer',
                changes['toggle2xRightInfluencer']
              );
            }}
          />
        </div>
      </div>
    </FormGroup>
  );
}

Grid2xOptions.propTypes = {
  disabled: PropTypes.bool,
};

export { Grid2xOptions };
