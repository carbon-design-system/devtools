import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Checkbox, FormGroup } from 'carbon-components-react';
import { setStorage, getStorage } from '../../../utilities';
import { labelMaker } from './labelMaker';

const { prefix } = settings;
const defaults = {
    miniUnitBorders: true
};

function GridMiniUnitOptions ({ disabled }) {

    const [toggleMiniUnitGridOptions, setToggleMiniUnitGridOptions] = useState(defaults);
    const [onLoad, setOnLoad] = useState(false);

    useEffect(() => { // get storage and set defaults
        const dataKey = 'toggleMiniUnitGridOptions';
        getStorage([dataKey], dataReceived => {
            setToggleMiniUnitGridOptions(dataReceived[dataKey]);
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
                            defaultChecked
                            disabled={disabled}
                            labelText={labelMaker('Cells')}
                            id="miniUnitCells"
                            checked={toggleMiniUnitGridOptions['miniUnitCells']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitCells'] = e;
                                setToggleMiniUnitGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            defaultChecked
                            disabled={disabled}
                            labelText={labelMaker('Borders')}
                            id="miniUnitBorders"
                            checked={toggleMiniUnitGridOptions['miniUnitBorders']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitBorders'] = e;
                                setToggleMiniUnitGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            defaultChecked
                            disabled={disabled}
                            labelText={labelMaker('Fix on scroll')}
                            id="miniUnitFix"
                            checked={toggleMiniUnitGridOptions['miniUnitFix']}
                            onChange={e => {
                                const changes = {...toggleMiniUnitGridOptions};
                                changes['miniUnitFix'] = e;
                                setToggleMiniUnitGridOptions(changes);
                            }}
                        />
                    </div>
                </div>
            </FormGroup>
        </>
    );
}

export { GridMiniUnitOptions };