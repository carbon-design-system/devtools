import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, AccordionItem, ToggleSmall } from 'carbon-components-react';
import { getStorage, setStorage } from '../../../utilities';
import { themes } from '@carbon/themes';

const { prefix } = settings;

function General () {
    const [themeState, setThemeState] = useState('g90');
    const [experimentalState, setExperimentalState] = useState(false);
    const themeList = Object.keys(themes);

    useEffect(() => {
        getStorage(['generalTheme', 'generalExperimental'], ({ generalTheme, generalExperimental }) => {
            if (generalTheme) {
                setThemeState(generalTheme);
            }

            if (generalExperimental) {
                setExperimentalState(generalExperimental);
            }
        });
    }, []);

    return (
        <AccordionItem title="General settings" open={false}>

            <Select
                size="sm"
                onChange={setTheme}
                labelText="Choose a theme"
                className={`${prefix}--options__select`}>
                {themeList.map(theme => 
                    <SelectItem
                        value={theme}
                        text={theme}
                        selected={theme === themeState ? true : false}
                    />
                )}
            </Select>
            
            <ToggleSmall
                labelText="Experimental features"
                className={`${prefix}--options__experimental`}
                id="experimental"
                toggled={experimentalState}
                onChange={setExperimental}
            />
        </AccordionItem>
    );
}

function setTheme (e) {
    const value = e.target.value;
    setStorage({ generalTheme: value });
}

function setExperimental (e) {
    const value = e.target.checked;
    setStorage({ generalExperimental: value });
}

export { General };