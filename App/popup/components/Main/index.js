import React, { useEffect, useState } from "react";
import { settings } from 'carbon-components';
import { merge } from 'lodash';
import { Accordion, AccordionItem, ToggleSmall, Toggle } from 'carbon-components-react';
import { Inventory, Grid, Specs } from '../';
import { setStorage, getStorage } from '../../../utilities';

const { prefix } = settings;
const defaults = {
    Grids: true
};

// can we get defaults before settings state? Maybe via a prop from higher up?
function Main () {
    const [globalToggleStates, setGlobalToggleStates] = useState(defaults);
    const [onLoad, setOnLoad] = useState(false);

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

    return (
        <Accordion className={`${prefix}--popup-main`}>
            {renderAccordionItem('Inventory', Inventory)}
            {renderAccordionItem('Specs', Specs)}
            {renderAccordionItem('Grids', Grid)}
        </Accordion>
    );

    function renderAccordionItem (title, Content) {
        const id = title.replace(' ', '');
        console.log(globalToggleStates[id]);
        return !onLoad ? null : (
            <AccordionItem
                className={`${prefix}--popup-main__item`}
                open={globalToggleStates[id]}
                title={(
                    <div className={`${prefix}--row`}>
                        <div className={`${prefix}--col`}>{title}</div>
                        <div className={`${prefix}--col`}>
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