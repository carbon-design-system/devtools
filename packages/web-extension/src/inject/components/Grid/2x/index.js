import { settings } from 'carbon-components';
import { getStorage, storageItemChanged } from '@carbon/devtools-utilities';

const { prefix } = settings;

function manage2xGrid () {
    getStorage('toggle2xGridOptions', ({ toggle2xGridOptions }) => manage2xGridOptions(toggle2xGridOptions)); // set based on defaults
    storageItemChanged('toggle2xGridOptions', manage2xGridOptions); // update ui if options change
}

function manage2xGridOptions ({
        toggle2xColumns,
        toggle2xGutters,
        toggle2xBorders,
        toggle2xFullWidth,
        toggle2xBreakpoints,
        toggle2xLeftInfluencer,
        toggle2xRightInfluencer
    }) {

    const html = document.querySelector('html');
    const grid2x = html.querySelector(`.${prefix}--grid-2x`);
    
    // set grid influencers
    grid2x.style.paddingLeft = `${toggle2xLeftInfluencer || 0}px`;
    grid2x.style.paddingRight = `${toggle2xRightInfluencer || 0}px`;

    // hide or show columns
    if (toggle2xColumns) {
        grid2x.classList.add(`${prefix}--grid-2x--inner`);
    } else {
        grid2x.classList.remove(`${prefix}--grid-2x--inner`);
    }

    // hide or show gutters
    if (toggle2xGutters) {
        grid2x.classList.add(`${prefix}--grid-2x--outer`);
    } else {
        grid2x.classList.remove(`${prefix}--grid-2x--outer`);
    }

    // hide or show borders/dividers
    if (toggle2xBorders) {
        grid2x.classList.add(`${prefix}--grid-2x--inner-border`, `${prefix}--grid-2x--outer-border`);
    } else {
        grid2x.classList.remove(`${prefix}--grid-2x--inner-border`, `${prefix}--grid-2x--outer-border`);
    }

    // toggle between full width and max-width modifier
    if (toggle2xFullWidth) {
        grid2x.querySelector(`.${prefix}--grid`).classList.add(`${prefix}--grid--full-width`);
    } else {
        grid2x.querySelector(`.${prefix}--grid`).classList.remove(`${prefix}--grid--full-width`);
    }

    // hide or show breakpoint label
    if (toggle2xBreakpoints) {
        html.classList.add(`${prefix}--grid-2x--breakpoint-label`);
    } else {
        html.classList.remove(`${prefix}--grid-2x--breakpoint-label`);
    }
}

export { manage2xGrid };