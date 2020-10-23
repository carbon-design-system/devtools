import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { setStorage, getStorage, gaConfigurationEvent } from '../../../utilities';
import { ToggleSmall, FormGroup, TileGroup, RadioTile } from 'carbon-components-react';
import { ComingSoon } from '../';
import { CustomOutline32 } from './CustomOutline32';
import { ColorPalette32, TextScale32, Grid32, VirtualColumn32, ParentChild32, Scale32 } from '@carbon/icons-react';

const { prefix } = settings;

const defaults = 'dependencies';


function Specs ({ disabled }) {
    const [toggleSpecs, setToggleSpecs] = useState(defaults);
    const [onLoad, setOnLoad] = useState(false);

    useEffect(() => { // get storage and set defaults
        const dataKey = 'toggleSpecs';
        getStorage([dataKey], dataReceived => {
            if (dataReceived && dataReceived[dataKey]) {
                setToggleSpecs(dataReceived[dataKey]);
            }
            setOnLoad(true);
        });
    }, []);

    useEffect(() => { // update storage
        if (onLoad) {
            setStorage({ toggleSpecs });
        }
    });

    return !onLoad ? null : (
        <TileGroup
            defaultSelected={toggleSpecs}
            name="specs"
            className={`${prefix}--popup__specs`}
            onChange={e => {
                setToggleSpecs(e);
                gaConfigurationEvent('specs-change', e)
            }}>
            <RadioTile
                id="specsColor"
                name="specs"
                value="color">
                <ColorPalette32 className={`${prefix}--popup__specs-icon`} />
                Color
            </RadioTile>
            <RadioTile
                id="specsDependencies"
                name="specs"
                value="dependencies">
                <ParentChild32 className={`${prefix}--popup__specs-icon`} />
                Dependencies
            </RadioTile>
            <RadioTile
                id="specsGrid"
                name="specs"
                value="grid">
                <Grid32 className={`${prefix}--popup__specs-icon`} />
                Grid
            </RadioTile>
            <RadioTile
                id="specsOutline"
                name="specs"
                value="outline">
                <CustomOutline32 className={`${prefix}--popup__specs-icon`} />
                Outline
            </RadioTile>
            <RadioTile
                id="specsRatio"
                name="specs"
                value="ratio">
                <Scale32 className={`${prefix}--popup__specs-icon`} />
                Ratio
            </RadioTile>
            <RadioTile
                id="specsSpacing"
                name="specs"
                value="spacing">
                <VirtualColumn32 className={`${prefix}--popup__specs-icon`} />
                Spacing
            </RadioTile>
            <RadioTile
                id="specsTypography"
                name="specs"
                value="typography">
                <TextScale32 className={`${prefix}--popup__specs-icon`} />
                Typography
            </RadioTile>
        </TileGroup>
    );
}

export { Specs };