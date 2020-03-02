import { settings } from 'carbon-components';
import { storageTrueFalse, getStorage, storageChanged } from '../../../../utilities';
import { themes } from '@carbon/themes';

const { prefix } = settings;
const themeList = Object.keys(themes);

function manage2xGrid (result) {
    const html = document.querySelector('html');
    const grid2x = html.querySelector(`.${prefix}--grid-2x`);

    // 2X GRID
    // ---
    // hide or show 2x grid
    storageTrueFalse(result.toggle2xGridState, () => {
        html.classList.remove(`${prefix}--grid--hide-col-label`);
        grid2x.classList.remove(`${prefix}--grid-2x--hide`);
    }, () => {
        html.classList.add(`${prefix}--grid--hide-col-label`);
        grid2x.classList.add(`${prefix}--grid-2x--hide`);
    });

    // hide or show columns
    storageTrueFalse(result.toggle2xColumnsState, () => {
        grid2x.classList.add(`${prefix}--grid-2x--inner`);
    }, () => {
        grid2x.classList.remove(`${prefix}--grid-2x--inner`);
    });

    // hide or show gutters
    storageTrueFalse(result.toggle2xGuttersState, () => {
        grid2x.classList.add(`${prefix}--grid-2x--outer`);
    }, () => {
        grid2x.classList.remove(`${prefix}--grid-2x--outer`);
    });

    // hide or show borders/dividers
    storageTrueFalse(result.toggle2xBordersState, () => {
        grid2x.classList.add(`${prefix}--grid-2x--inner-border`, `${prefix}--grid-2x--outer-border`);
    }, () => {
        grid2x.classList.remove(`${prefix}--grid-2x--inner-border`, `${prefix}--grid-2x--outer-border`);
    });

    // toggle between full width and max-width modifier
    storageTrueFalse(result.toggle2xFullWidthState, () => {
        grid2x.querySelector(`.${prefix}--grid`).classList.add(`${prefix}--grid--full-width`);
    }, () => {
        grid2x.querySelector(`.${prefix}--grid`).classList.remove(`${prefix}--grid--full-width`);
    });

    // toggle on or off column identifier by hover
    storageTrueFalse(result.toggle2xHoverState, () => {
        html.classList.add(`${prefix}--grid--hover`);
    }, () => {
        html.classList.remove(`${prefix}--grid--hover`);
    });

    // hide or show breakpoint label
    storageTrueFalse(result.toggle2xBreakpointLabelState, () => {
        html.classList.add(`${prefix}--grid-2x--breakpoint-label`);
    }, () => {
        html.classList.remove(`${prefix}--grid-2x--breakpoint-label`);
    });

    // set theme
    getStorage(['generalTheme'], setThemeClass);

    storageChanged(() => {
        getStorage(['generalTheme'], setThemeClass);
    });

    function setThemeClass (data) {
        grid2x.classList.remove(...themeList.map(theme => `${prefix}--grid-2x--${theme}`)); // remove any first
        grid2x.classList.add(`${prefix}--grid-2x--${data}`);
    }
}

export { manage2xGrid };