import React from "react";
import ReactDOM from "react-dom";

import { Toggle } from 'carbon-components-react';

import './index.scss';

function Popup () {
    return (
        <article className="bx--popup bx--grid">
            <div className="bx--row">
                <div class="bx--col">
                    <h1 className="bx--popup__title">IBM Dotcom Devtools</h1>
                </div>
            </div>
            <div className="bx--row bx--popup__section">
                <div class="bx--col">
                    <Toggle
                        labelText="All grids"
                        labelA="Off"
                        labelB="On"
                        onToggle={toggleGrids}
                    />
                </div>
            </div>
            <div className="bx--row">
                <div class="bx--col">
                    <h2 className="bx--popup__section-title">2x grid options</h2>
                </div>
            </div>
            <div className="bx--row">
                <div class="bx--col-sm-2">
                    <Toggle
                        defaultToggled
                        labelText="Columns"
                        labelA="Off"
                        labelB="On"
                        onToggle={toggle2xColumns}
                    />
                </div>
                <div class="bx--col-sm-2">
                    <Toggle
                        labelText="Gutters"
                        labelA="Off"
                        labelB="On"
                        onToggle={toggle2xGutters}
                    />
                </div>
                <div class="bx--col-sm-2">
                    <Toggle
                        labelText="Borders"
                        labelA="Off"
                        labelB="On"
                        onToggle={toggle2xBorders}
                    />
                </div>
            </div>
            <div className="bx--row">
                <div class="bx--col">
                    <h2 className="bx--popup__section-title">Mini unit grid options</h2>
                </div>
            </div>
            <div className="bx--row">
                <div class="bx--col">
                    <Toggle
                        labelText="Borders"
                        labelA="Off"
                        labelB="On"
                        onToggle={toggleMiniUnitBorders}
                    />
                </div>
                <div class="bx--col">
                    <Toggle
                        labelText="Fixed"
                        labelA="Off"
                        labelB="On"
                        onToggle={toggleMiniUnitFixed}
                    />
                </div>
            </div>
        </article>
    );
}

function toggleGrids (e) {
    sendMessage({ toggleGrids: e });
}

function toggle2xColumns (e) {
    sendMessage({ toggle2xColumns: e });
}

function toggle2xGutters (e) {
    sendMessage({ toggle2xGutters: e });
}

function toggle2xBorders (e) {
    sendMessage({ toggle2xBorders: e });
}

function toggleMiniUnitBorders (e) {
    sendMessage({ toggleMiniUnitBorders: e });
}

function toggleMiniUnitFixed (e) {
    sendMessage({ toggleMiniUnitFixed: e });
}

function sendMessage (msg) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

const body = document.querySelector('body');
body.innerHTML = '<div id="app"></div>' + body.innerHTML;
ReactDOM.render(<Popup />, document.getElementById('app'));