import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, AccordionItem, ToggleSmall } from 'carbon-components-react';
import { getStorage, setStorage, gaNavigationEvent, gaConfigurationEvent } from '../../../utilities';
import { themes } from '@carbon/themes';

const { prefix } = settings;

function General () {
    const [themeState, setThemeState] = useState('g90');
    const [experimentalState, setExperimentalState] = useState(false);
    const [nonCarbonState, setNonCarbonState] = useState(false);
    const themeList = Object.keys(themes);

    useEffect(() => {
        // consider grouping into an object. Look at 2x grid family in /popup
        getStorage(['generalTheme', 'generalExperimental', 'generalNonCarbon'], ({ generalTheme, generalExperimental, generalNonCarbon }) => {
            if (generalTheme) {
                setThemeState(generalTheme);
            }

            if (generalExperimental) {
                setExperimentalState(generalExperimental);
            }

            if (generalNonCarbon) {
                setNonCarbonState(generalNonCarbon);
            }
        });
    }, []);

    return (
        <AccordionItem
            onClick={() => gaNavigationEvent('toggle', 'general-settings')}
            title="General settings"
            open={false}>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        labelText="Non-carbon pages"
                        className={`${prefix}--options__non-carbon`}
                        id="nonCarbon"
                        toggled={nonCarbonState}
                        onChange={setNonCarbon}
                    />
                </div>
                <div className={`${prefix}--col-sm-2`}>
                    <ToggleSmall
                        labelText="Experimental features"
                        className={`${prefix}--options__experimental`}
                        id="experimental"
                        toggled={experimentalState}
                        onChange={setExperimental}
                    />
                </div>
            </div>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col-sm-2`}>
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
                </div>
            </div>
        </AccordionItem>
    );
}

function setTheme (e) {
    const value = e.target.value;
    setStorage({ generalTheme: value }, () => {
        gaConfigurationEvent('general-settings-change', 'general-theme');
    });
}

function setExperimental (e) {
    const value = e.target.checked;
    setStorage({ generalExperimental: value }, () => {
        gaConfigurationEvent('general-settings-change', 'general-experimental', value);
    });
}

function setNonCarbon (e) {
    const value = e.target.checked;
    setStorage({ generalNonCarbon: value }, () => {
        gaConfigurationEvent('general-settings-change', 'general-ignore-validation', value);
    });
}

export { General };