import React, { useState, useEffect } from "react";
import { settings } from 'carbon-components';
import { setStorage, getStorage } from '../../../utilities';
import { ToggleSmall, FormGroup } from 'carbon-components-react';
import { ComingSoon } from '../';

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
            <section className={`${prefix}--popup-main__section`}>
                <div className={`${prefix}--row`}>
                    <div className={`${prefix}--col-sm-2`}>
                        <h2 className={`${prefix}--popup-main__section-title`}>On hover</h2>
                    </div>
                </div>
                <FormGroup legendText="Options">
                    <div className={`${prefix}--row`}>
                        <div className={`${prefix}--col-sm-2`}>
                            <ComingSoon />
                        </div>
                    </div>
                </FormGroup>
            </section>
            <section className={`${prefix}--popup-main__section`}>
                <div className={`${prefix}--row`}>
                    <div className={`${prefix}--col-sm-2`}>
                        <h2 className={`${prefix}--popup-main__section-title`}>Color</h2>
                    </div>
                </div>
                <FormGroup legendText="Options">
                    <div className={`${prefix}--row`}>
                        <div className={`${prefix}--col-sm-2`}>
                            <ComingSoon />
                        </div>
                    </div>
                </FormGroup>
            </section>
        </>
    );
}

export { Specs };