import { settings } from 'carbon-components';
import { storageTrueFalse } from '../../../../utilities';

const { prefix } = settings;

function manageMiniUnitGrid (result) {
    const html = document.querySelector('html');

    // MINI UNIT GRID
    // ---
    // show or hide mini unit grid
    storageTrueFalse(result.toggleMiniUnitBordersState, () => {
        html.classList.add(`${prefix}--grid--mini-unit`);
    }, () => {
        html.classList.remove(`${prefix}--grid--mini-unit`);
    });
    
    // show or hide mini unit border
    // show or hide mini unit inner

    // Toggle between fixing or scrolling mini unit grid
    storageTrueFalse(result.toggleMiniUnitFixedState, () => {
        html.classList.add(`${prefix}--grid-mini-unit--fixed`);
    }, () => {
        html.classList.remove(`${prefix}--grid-mini-unit--fixed`);
    });
}

export { manageMiniUnitGrid };