import { settings } from 'carbon-components';
import { storageTrueFalse } from '../../../../utilities';

const { prefix } = settings;

function manage2xGrid (result) {
    const html = document.querySelector('html');
    const gridContainer = html.querySelector(`.${prefix}--grid-container`);
    
    // hide or show 2x grid

    // 2X GRID
    // ---
    // hide or show columns
    storageTrueFalse(result.toggle2xColumnsState, () => {
        gridContainer.classList.add(`${prefix}--grid--inner`);
    }, () => {
        gridContainer.classList.remove(`${prefix}--grid--inner`);
    });

    // hide or show gutters
    storageTrueFalse(result.toggle2xGuttersState, () => {
        gridContainer.classList.add(`${prefix}--grid--outer`);
    }, () => {
        gridContainer.classList.remove(`${prefix}--grid--outer`);
    });

    // hide or show borders/dividers
    storageTrueFalse(result.toggle2xBordersState, () => {
        gridContainer.classList.add(`${prefix}--grid--inner-border`, `${prefix}--grid--outer-border`);
    }, () => {
        gridContainer.classList.remove(`${prefix}--grid--inner-border`, `${prefix}--grid--outer-border`);
    });

    // toggle between full width and max-width modifier
    storageTrueFalse(result.toggle2xFullWidthState, () => {
        gridContainer.querySelector(`.${prefix}--grid`).classList.add(`${prefix}--grid--full-width`);
    }, () => {
        gridContainer.querySelector(`.${prefix}--grid`).classList.remove(`${prefix}--grid--full-width`);
    });

    // hide or show breakpoint label
    storageTrueFalse(result.toggle2xBreakpointLabelState, () => {
        html.classList.add(`${prefix}--grid--breakpoint-label`);
    }, () => {
        html.classList.remove(`${prefix}--grid--breakpoint-label`);
    });

    // toggle on or off column identifier by hover
    storageTrueFalse(result.toggle2xHoverState, () => {
        html.classList.add(`${prefix}--grid--hover`);
    }, () => {
        html.classList.remove(`${prefix}--grid--hover`);
    });
}

export { manage2xGrid };