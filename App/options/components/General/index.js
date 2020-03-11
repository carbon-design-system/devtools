import React, { useState, useEffect, useRef } from "react";
import { settings } from 'carbon-components';
import { Select, SelectItem, AccordionItem } from 'carbon-components-react';
import { getStorage, setStorage } from '../../../utilities';
import { themes } from '@carbon/themes';

const { prefix } = settings;

function General () {
    const [defaultValue, setDefaultValue] = useState('g90');
    const selectTheme = useRef(null);
    const themeList = Object.keys(themes);

    useEffect(() => {
        getStorage(['generalTheme'], ({ generalTheme }) => {
            console.log(generalTheme);
            if (generalTheme) {
                setDefaultValue(generalTheme);
            }
        });
    }, []);

    return (
        <AccordionItem title="General settings" open={false}>
            <Select
                ref={selectTheme}
                onChange={() => setTheme(selectTheme)}
                labelText="Choose a theme"
                defaultValue={defaultValue}
                size="sm"
                className={`${prefix}--options__select`}>
                {themeList.map(theme => 
                    <SelectItem
                        value={theme}
                        text={theme}
                        selected={theme === defaultValue ? true : false }
                    />
                )}
            </Select>
        </AccordionItem>
    );
}

function setTheme (ref) {
    const value = ref.current.value;
    setStorage({ generalTheme: value });
}

export { General };