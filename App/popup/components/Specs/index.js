import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { setStorage, getStorage } from '../../../utilities';
import { ToggleSmall, FormGroup, TileGroup, RadioTile } from 'carbon-components-react';
import { ComingSoon } from '../';
import { ColorPalette32, TextScale32, Grid32, VirtualColumn32, ParentChild32 } from '@carbon/icons-react';

const { prefix } = settings;

const defaults = {};


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
        <>
        
        <TileGroup
            // defaultSelected="default-selected"
            // legend="Radio Tile Group"
            name="tile-group"
            className={`${prefix}--popup__specs`}>
            <RadioTile
                id="specsGrid"
                name="specs"
                value="grid">
                <Grid32 className={`${prefix}--popup__specs-icon`} />
                Grid
            </RadioTile>
            <RadioTile
                id="specsTypography"
                name="specs"
                value="typography">
                <TextScale32 className={`${prefix}--popup__specs-icon`} />
                Typography
            </RadioTile>
            <RadioTile
                id="specsSpacing"
                name="specs"
                value="spacing">
                <VirtualColumn32 className={`${prefix}--popup__specs-icon`} />
                Spacing
            </RadioTile>
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
        </TileGroup>
            {/*// <section className={`${prefix}--popup-main__section`}>
            //     <div className={`${prefix}--row`}>
            //         <div className={`${prefix}--col-sm-2`}>
            //             <h2 className={`${prefix}--popup-main__section-title`}>On hover</h2>
            //         </div>
            //     </div>
            //     <FormGroup legendText="Options">
            //         <div className={`${prefix}--row`}>
            //             <div className={`${prefix}--col-sm-2`}>
            //                 <ComingSoon />
            //             </div>
            //         </div>
            //     </FormGroup>
            // </section>
            // <section className={`${prefix}--popup-main__section`}>
            //     <div className={`${prefix}--row`}>
            //         <div className={`${prefix}--col-sm-2`}>
            //             <h2 className={`${prefix}--popup-main__section-title`}>Color</h2>
            //         </div>
            //     </div>
            //     <FormGroup legendText="Options">
            //         <div className={`${prefix}--row`}>
            //             <div className={`${prefix}--col-sm-2`}>
            //                 <ComingSoon />
            //             </div>
            //         </div>
            //     </FormGroup>
            // </section>*/}
        </>
    );
}

export { Specs };