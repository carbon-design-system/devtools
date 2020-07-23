import React, { useEffect, useState } from "react";
import { settings } from 'carbon-components';
import { Accordion, AccordionItem, ToggleSmall, Toggle } from 'carbon-components-react';
import { Inventory, Specs, Grid } from '../';
import { setStorage, getStorage, betaFlag } from '../../../utilities';

const { prefix } = settings;
const defaults = {
    Grid: true
};

// can we get defaults before settings state? Maybe via a prop from higher up?
function Main () {
    const [globalToggleStates, setGlobalToggleStates] = useState(defaults);
    const [onLoad, setOnLoad] = useState(false);

    /* temporary, figure this out this shouldn't be defined here? for some reason imports come back undefined right now */
    const groups = {
        // 'Inventory': Inventory,
        // 'Specs': Specs,
        'Grid': Grid
    };
    const groupsList = Object.keys(groups);

    useEffect(() => { // get storage and set defaults
        const dataKey = 'globalToggleStates';
        getStorage([dataKey], dataReceived => {
            if (dataReceived && dataReceived[dataKey]) {
                setGlobalToggleStates(dataReceived[dataKey]);
            }
            setOnLoad(true);
        });
    }, []);

    useEffect(() => { // update storage
        if (onLoad) {
            setStorage({ globalToggleStates });
        }
    });

    useEffect(() => { // stop toggle bubbling
        const toggles = document.querySelectorAll(`.${prefix}--popup-main__toggle`);
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', e => {
                e.stopPropagation();
            });
        });
    });

    betaFlag(true, () => {
        useEffect(() => { // TEMPORARY prevent accordion from opening and closing
            const accordions = document.querySelectorAll(`.${prefix}--accordion__heading`);
        
            accordions.forEach(accordion => {
                accordion.disabled = true;
                accordion.style.cursor = 'default';
            });
        });
    });

    return (
        <Accordion className={`${prefix}--popup-main`}>
            {groupsList.map(groupName => renderAccordionItem(groupName, groups[groupName]))}
        </Accordion>
    );

    function renderAccordionItem (title, Content) {
        const id = title.replace(' ', '');
        return !onLoad ? null : (
            <AccordionItem
                className={`${prefix}--popup-main__item`}
                // open={globalToggleStates[id]}
                open={true}
                title={(
                    <div className={`${prefix}--row`}>
                        <div className={`${prefix}--col-sm-2`}>{title}</div>
                        <div className={`${prefix}--col-sm-2`}>
                            <ToggleSmall
                                id={id}
                                className={`${prefix}--popup-main__toggle`}
                                toggled={globalToggleStates[id]}
                                onToggle={e => {
                                    const changes = {...globalToggleStates};
                                    changes[id] = e;
                                    setGlobalToggleStates(changes);
                                }}
                            />
                        </div>
                    </div>
                )}>
                <Content disabled={!globalToggleStates[id]} />
            </AccordionItem>
        );
    }
}

export { Main };