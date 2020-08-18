import React from "react";
import ReactDOM from "react-dom";
import { settings } from 'carbon-components';
import { Accordion } from 'carbon-components-react';
import { Footer, General, Grid, Shortcuts } from './components';
import { gaPageview } from '../utilities';

import './index.scss';

const { prefix } = settings;

gaPageview('/options', document.title);

function Options () {
    return (
        <article className={`${prefix}--options ${prefix}--grid`}>
            <div className={`${prefix}--row`}>
                <div className={`${prefix}--col`}>
                    <h1 className={`${prefix}--options__title`}>Settings</h1>
                    <Accordion>
                        <General />
                        <Grid />
                        <Shortcuts />
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