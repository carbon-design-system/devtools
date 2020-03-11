import { settings } from 'carbon-components';
import { getStorage, storageChanged } from '../../../../utilities';

const { prefix } = settings;

function manageMiniUnitGrid () {    
    getStorage('toggleMiniUnitGridOptions', ({ toggleMiniUnitGridOptions }) => manageMiniUnitGridOptions(toggleMiniUnitGridOptions)); // set based on defaults
    storageChanged('toggleMiniUnitGridOptions', manageMiniUnitGridOptions); // update ui if options change
}

function manageMiniUnitGridOptions ({
        miniUnitCells,
        miniUnitBorders,
        miniUnitFix
    }) {

    const miniUnitGrid = document.querySelector(`.${prefix}--grid-mini-unit`);

    // ** show or hide mini unit cells
    if (miniUnitCells) {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--cell`);
    } else {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--cell`);
    }

    // show or hide mini unit borders
    if (miniUnitBorders) {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--border`);
    } else {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--border`);
    }

    // Toggle between fixing or scrolling mini unit grid
    if (miniUnitFix) {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--fixed`);
    } else {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--fixed`);
    }
}

export { manageMiniUnitGrid };