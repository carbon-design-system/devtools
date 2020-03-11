import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Checkbox, FormGroup, Tooltip } from 'carbon-components-react';
import { setStorage, getStorage } from '../../../utilities';
import { Column32, Grid32, Information16 } from '@carbon/icons-react';
import { labelMaker } from './labelMaker';

const { prefix } = settings;
const defaults = {
    toggle2xColumns: true,
    toggle2xBreakpoints: true
};

let onLoad = false;

function Grid2xOptions ({ disabled }) {

    const [toggle2xGridOptions, setToggle2xGridOptions] = useState(defaults);

    useEffect(() => { // get storage and set defaults
        const dataKey = 'toggle2xGridOptions';
        getStorage([dataKey], dataReceived => {
            // should this be passed in via props?
            setToggle2xGridOptions(dataReceived[dataKey]);
            onLoad = true;
        });
    }, []);

    useEffect(() => { // update storage
        if (onLoad) {
            setStorage({ toggle2xGridOptions });
        }
    });

    return !onLoad ? null : (
        <>
            <FormGroup legendText="Options">
                <div className={`${prefix}--row`}>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Columns')}
                            id="toggle2xColumns"
                            checked={toggle2xGridOptions['toggle2xColumns']}
                            onChange={e => {
                                const changes = {...toggle2xGridOptions};
                                changes['toggle2xColumns'] = e;
                                setToggle2xGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Gutters')}
                            id="toggle2xGutters"
                            checked={toggle2xGridOptions['toggle2xGutters']}
                            onChange={e => {
                                const changes = {...toggle2xGridOptions};
                                changes['toggle2xGutters'] = e;
                                setToggle2xGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Borders')}
                            id="toggle2xBorders"
                            checked={toggle2xGridOptions['toggle2xBorders']}
                            onChange={e => {
                                const changes = {...toggle2xGridOptions};
                                changes['toggle2xBorders'] = e;
                                setToggle2xGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Full width')}
                            id="toggle2xFullWidth"
                            checked={toggle2xGridOptions['toggle2xFullWidth']}
                            onChange={e => {
                                const changes = {...toggle2xGridOptions};
                                changes['toggle2xFullWidth'] = e;
                                setToggle2xGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Breakpoints')}
                            id="toggle2xBreakpoints"
                            checked={toggle2xGridOptions['toggle2xBreakpoints']}
                            onChange={e => {
                                const changes = {...toggle2xGridOptions};
                                changes['toggle2xBreakpoints'] = e;
                                setToggle2xGridOptions(changes);
                            }}
                        />
                    </div>
                    <div className={`${prefix}--col-sm-2`}>
                        <Checkbox
                            disabled={disabled}
                            labelText={labelMaker('Column label')}
                            id="toggle2xColumnLabel"
                            checked={toggle2xGridOptions['toggle2xColumnLabel']}
                            onChange={e => {
                                const changes = {...toggle2xGridOptions};
                                changes['toggle2xColumnLabel'] = e;
                                setToggle2xGridOptions(changes);
                            }}
                        />
                    </div>
                </div>
            </FormGroup>
        </>
    );
}

export { Grid2xOptions };