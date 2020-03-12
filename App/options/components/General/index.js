import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, AccordionItem } from 'carbon-components-react';
import { getStorage, setStorage } from '../../../utilities';
import { themes } from '@carbon/themes';

const { prefix } = settings;

function General () {
    const [themeState, setThemeState] = useState('g90');
    const themeList = Object.keys(themes);

    useEffect(() => {
        getStorage(['generalTheme'], ({ generalTheme }) => {
            if (generalTheme) {
                setThemeState(generalTheme);
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
        </AccordionItem>
    );
}

function setTheme (e) {
    const value = e.target.value;
    setStorage({ generalTheme: value });
}

export { General };