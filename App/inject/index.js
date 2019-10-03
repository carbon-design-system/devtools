import './index.scss';

const GRID_HTML = `
<div class="bx--grid-overlay">
    <div class="bx--grid">
        <div class="bx--row">
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
            <div class="bx--col-sm-1 bx--col-md-1 bx--col-lg-1"></div>
        </div>
    </div>
</div>`;

const body = document.querySelector('body');
const gridContainer = document.createElement('div');

gridContainer.classList.add('bx--grid-container')
gridContainer.innerHTML = GRID_HTML;

body.appendChild(gridContainer);

body.classList.add('bx--grid--hide');
body.querySelector('.bx--grid-container').classList.add('bx--grid--inner');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.toggleGrids === true) {
        body.classList.remove('bx--grid--hide');
    } else if (request.toggleGrids === false) {
        body.classList.add('bx--grid--hide');
    }

    if (request.toggle2xColumns === true) {
        body.querySelector('.bx--grid-container').classList.add('bx--grid--inner');
    } else if (request.toggle2xColumns === false) {
        body.querySelector('.bx--grid-container').classList.remove('bx--grid--inner');
    }

    if (request.toggle2xGutters === true) {
        body.querySelector('.bx--grid-container').classList.add('bx--grid--outer');
    } else if (request.toggle2xGutters === false) {
        body.querySelector('.bx--grid-container').classList.remove('bx--grid--outer');
    }

    if (request.toggle2xBorders === true) {
        body.querySelector('.bx--grid-container').classList.add('bx--grid--inner-border', 'bx--grid--outer-border');
    } else if (request.toggle2xBorders === false) {
        body.querySelector('.bx--grid-container').classList.remove('bx--grid--inner-border', 'bx--grid--outer-border');
    }

    if (request.toggleMiniUnitBorders === true) {
        body.classList.add('bx--grid--mini-unit');
    } else if (request.toggleMiniUnitBorders === false) {
        body.classList.remove('bx--grid--mini-unit');
    }

    if (request.toggleMiniUnitFixed === true) {
        body.classList.add('bx--grid--fixed');
    } else if (request.toggleMiniUnitFixed === false) {
        body.classList.remove('bx--grid--fixed');
    }
});