import React, { useState, useEffect} from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, AccordionItem } from 'carbon-components-react';
import { getStorage, setStorage, gaNavigationEvent, gaConfigurationEvent } from '../../../utilities';
import { gridVersions } from '../../../globals';

const { prefix } = settings;
const gridVersionList = Object.keys(gridVersions);

function Grid () {
    const [gridVersionState, setGridVersionState] = useState('carbon-v10');

    useEffect(() => {
        getStorage(['gridVersion'], ({ gridVersion }) => {
            if (gridVersion) {
                setGridVersionState(gridVersion);
            }
        });
    }, []);

    return (
        <AccordionItem
            onClick={() => gaNavigationEvent('toggle', 'grid-settings')}
            title="Grid settings"
            open={false}>
            <Select
                size="sm"
                labelText="Choose a grid"
                className={`${prefix}--options__select`}
                onChange={setGridVersion}
            >
                {gridVersionList.map(gridVersion => {
                    return (
                        <SelectItem
                            value={gridVersion}
                            text={gridVersions[gridVersion]}
                            selected={gridVersionState === gridVersion ? true : false}
                        />
                    );
                })}
            </Select>
        </AccordionItem>
    );
}

function setGridVersion (e) {
    const value = e.target.value;
    setStorage({ gridVersion: value }, () => {
        gaConfigurationEvent('grid-settings-change', 'grid-version');
    });
}

export { Grid };