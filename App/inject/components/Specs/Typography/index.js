// get data
// check for updates
// spec on?
// this item on?

import { settings } from 'carbon-components'

const { prefix } = settings;

const html = document.querySelector('html');
// const outlineClass = `${prefix}--specs--outline`;

function manageSpecsType (specs, specType) {
    if (specs && specType === 'type') {
        activateType();
    } else {
        deactivateType();
    }
}

function activateType () {
    // html.classList.add(outlineClass);

    // .bx--grid, .bx--row, .bx--col, .bx--col-sm-#, .bx--col-md-# ...
    // add highlight
    // add tooltip
    console.log('activate type');
}

function deactivateType () {
    // html.classList.remove(outlineClass);
    console.log('de-activate type');
}

export { manageSpecsType };