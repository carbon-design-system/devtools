import React from "react";
import ReactDOM from "react-dom";
import { settings } from 'carbon-components';
import { Accordion } from 'carbon-components-react';
import { Footer, General, Grid } from './components';

import './index.scss';

const { prefix } = settings;

function Options () {
    return (
        <article className={`${prefix}--options ${prefix}--grid`}>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col`}>
                    <h1 className={`${prefix}--options__title`}>Settings</h1>
                    <Accordion>
                        <General />
                        {/*<Grid />*/}
                    </Accordion>
                </div>
            </div>
            <Footer />
        </article>
    );
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Options />, document.getElementById('app'));