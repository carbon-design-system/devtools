import { settings } from 'carbon-components';
const { prefix } = settings;

import './index.scss';

const GRID_HTML = `
<div class="${prefix}--grid-overlay">
    <div class="${prefix}--grid">
        <div class="${prefix}--row">
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
            <div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>
        </div>
    </div>
</div>`;

const html = document.querySelector('html');
const body = document.querySelector('body');
const gridContainer = document.createElement('div');

html.classList.add(`${prefix}--grid--hide`);
gridContainer.classList.add(`${prefix}--grid-container`)
gridContainer.innerHTML = GRID_HTML;

body.appendChild(gridContainer);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.onLoad === true) {
        html.classList.remove(`${prefix}--grid--hide`);
        setDefaults();
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    updateGrid(changes);
});

function setDefaults() {
    chrome.storage.local.get(null, result => {
        updateGrid(result);
    });
}

function updateGrid (result) {
    manageDataSet(result.toggleGridsState, () => {
        html.classList.remove(`${prefix}--grid--hide`);
    }, () => {
        html.classList.add(`${prefix}--grid--hide`);
    });

    manageDataSet(result.toggle2xColumnsState, () => {
        gridContainer.classList.add(`${prefix}--grid--inner`);
    }, () => {
        gridContainer.classList.remove(`${prefix}--grid--inner`);
    });

    manageDataSet(result.toggle2xGuttersState, () => {
        gridContainer.classList.add(`${prefix}--grid--outer`);
    }, () => {
        gridContainer.classList.remove(`${prefix}--grid--outer`);
    });

    manageDataSet(result.toggle2xBordersState, () => {
        gridContainer.classList.add(`${prefix}--grid--inner-border`, `${prefix}--grid--outer-border`);
    }, () => {
        gridContainer.classList.remove(`${prefix}--grid--inner-border`, `${prefix}--grid--outer-border`);
    });

    manageDataSet(result.toggle2xFullWidthState, () => {
        gridContainer.querySelector(`.${prefix}--grid`).classList.add(`${prefix}--grid--full-width`);
    }, () => {
        gridContainer.querySelector(`.${prefix}--grid`).classList.remove(`${prefix}--grid--full-width`);
    });

    manageDataSet(result.toggle2xBreakpointLabelState, () => {
        html.classList.add(`${prefix}--grid--breakpoint-label`);
    }, () => {
        html.classList.remove(`${prefix}--grid--breakpoint-label`);
    });

    manageDataSet(result.toggleMiniUnitBordersState, () => {
        html.classList.add(`${prefix}--grid--mini-unit`);
    }, () => {
        html.classList.remove(`${prefix}--grid--mini-unit`);
    });

    manageDataSet(result.toggleMiniUnitFixedState, () => {
        html.classList.add(`${prefix}--grid--fixed`);
    }, () => {
        html.classList.remove(`${prefix}--grid--fixed`);
    });

    manageDataSet(result.toggle2xHoverState, () => {
        html.classList.add(`${prefix}--grid--hover`);
    }, () => {
        html.classList.remove(`${prefix}--grid--hover`);
    });
}

function manageDataSet(data, ifTrue, ifFalse) {
    if (data && (data === true || data.newValue === true)) {
        ifTrue();
    } else if (data && (data === false || data.newValue === false)) {
        ifFalse();
    }
}