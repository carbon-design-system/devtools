import { settings } from 'carbon-components';
import { storageTrueFalse } from '../../../../utilities';

const { prefix } = settings;

function manageMiniUnitGrid (result) {
    const miniUnitGrid = document.querySelector(`.${prefix}--grid-mini-unit`);

    // MINI UNIT GRID
    // ---
    // ** show or hide mini unit grid
    storageTrueFalse(result.toggleMiniUnitGridState, () => {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--hide`);
    }, () => {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--hide`);
    });

    // ** show or hide mini unit cells
    storageTrueFalse(result.toggleMiniUnitCellsState, () => {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--cell`);
    }, () => {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--cell`);
    });

    // show or hide mini unit borders
    storageTrueFalse(result.toggleMiniUnitBordersState, () => {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--border`);
    }, () => {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--border`);
    });

    // Toggle between fixing or scrolling mini unit grid
    storageTrueFalse(result.toggleMiniUnitFixedState, () => {
        miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--fixed`);
    }, () => {
        miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--fixed`);
    });
}

export { manageMiniUnitGrid };