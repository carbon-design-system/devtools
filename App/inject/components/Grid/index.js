import { settings } from 'carbon-components';
import { storageChanged, getStorage, storageTrueFalse } from '../../../utilities';
import { manage2xGrid } from './2x';
import { manageMiniUnitGrid } from './mini-unit';
import { manageColumnLabel } from './column-label';

const { prefix } = settings;
const html = document.querySelector('html');

function initGrid () {
    const body = html.querySelector('body');
    const gridContainerClassName = `${prefix}--grid-container`;
    const numOfColumns = 16;
    const columns = [];
    
    let gridContainer = body.querySelector(`.${gridContainerClassName}`);

    html.classList.add(`${prefix}--grid--hide`);

    for (let i = 0; i < numOfColumns; i++) {
        columns.push(`<div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>`);
    }

    const GRID_HTML = `
        <div class="${prefix}--grid-2x">
            <div class="${prefix}--grid">
                <div class="${prefix}--row">
                    ${columns.join('')}
                </div>
            </div>
        </div>
        <div class="${prefix}--grid-mini-unit ${prefix}--grid-mini-unit--hide"></div>`;
    
    if (!gridContainer) {
        gridContainer = document.createElement('div');
        gridContainer.classList.add(gridContainerClassName);
        gridContainer.innerHTML = GRID_HTML;
        body.appendChild(gridContainer);
    }

    // updates based sets defaults
    getStorage(null, updateGrid);

    // updates if storage changes
    storageChanged((changes, namespace) => {
        updateGrid(changes);
    });
}

function updateGrid (result) {
    // ALL GRIDS
    // ---
    // hide/show all grid elements
    storageTrueFalse(result.toggleGridsState, () => {
        html.classList.remove(`${prefix}--grid--hide`);
    }, () => {
        html.classList.add(`${prefix}--grid--hide`);
    });

    manage2xGrid(result);
    manageMiniUnitGrid(result);
}


export { initGrid };