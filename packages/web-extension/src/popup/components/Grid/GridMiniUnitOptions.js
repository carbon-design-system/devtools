import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Checkbox, FormGroup } from 'carbon-components-react';
import { setStorage, getStorage, gaConfigurationEvent } from '../../../utilities';
import { labelMaker } from './labelMaker';

const { prefix } = settings;
const defaults = {
    miniUnitVerticalBorders: true,
    miniUnitHorizontalBorders: true
};

function GridMiniUnitOptions ({ disabled }) {

    const [toggleMiniUnitGridOptions, setToggleMiniUnitGridOptions] = useState(defaults);
    const [onLoad, setOnLoad] = useState(false);

    useEffect(() => { // get storage and set defaults
        const dataKey = 'toggleMiniUnitGridOptions';
        getStorage([dataKey], dataReceived => {
            if (dataReceived && dataReceived[dataKey]) {
                setToggleMiniUnitGridOptions(dataReceived[dataKey]);
            }
            setOnLoad(true);
        });
    }, []);

    useEffect(() => { // update storage
        if (onLoad) {
            setStorage({ toggleMiniUnitGridOptions });
        }
    });

    return !onLoad ? null : (
        <>
            <FormGroup legendText="Options">
                <div className={`${prefix}--row`}>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Vertical')}
                            id="miniUnitVerticalBorders"
                            checked={toggleMiniUnitGridOptions['miniUnitVerticalBorders']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitVerticalBorders'] = e;
                                setToggleMiniUnitGridOptions(changes);
                                gaConfigurationEvent('mini-unit-grid-change', 'mini-unit-vertical-borders', e);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Horizontal')}
                            id="miniUnitHorizontalBorders"
                            checked={toggleMiniUnitGridOptions['miniUnitHorizontalBorders']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitHorizontalBorders'] = e;
                                setToggleMiniUnitGridOptions(changes);
                                gaConfigurationEvent('mini-unit-grid-change', 'mini-unit-horizontal-borders', e);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Cells')}
                            id="miniUnitCells"
                            checked={toggleMiniUnitGridOptions['miniUnitCells']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitCells'] = e;
                                setToggleMiniUnitGridOptions(changes);
                                gaConfigurationEvent('mini-unit-grid-change', 'mini-unit-cells', e);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Fix on scroll')}
                            id="miniUnitFix"
                            checked={toggleMiniUnitGridOptions['miniUnitFix']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitFix'] = e;
                                setToggleMiniUnitGridOptions(changes);
                                gaConfigurationEvent('mini-unit-grid-change', 'mini-unit-fix', e);
                            }}
                        />
                    </div>
                </div>
            </FormGroup>
        </>
    );
}

export { GridMiniUnitOptions };