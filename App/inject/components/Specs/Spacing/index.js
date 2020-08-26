// get data
// check for updates
// spec on?
// this item on?

import { settings } from 'carbon-components'

const { prefix } = settings;

const html = document.querySelector('html');
// const outlineClass = `${prefix}--specs--outline`;

function manageSpecsSpacing (specs, specType) {
    if (specs && specType === 'spacing') {
        activateSpacing();
    } else {
        deactivateSpacing();
    }
}

function activateSpacing () {
    // html.classList.add(outlineClass);

    // .bx--grid, .bx--row, .bx--col, .bx--col-sm-#, .bx--col-md-# ...
    // add highlight
    // add tooltip
    console.log('activate spacing');
}

function deactivateSpacing () {
    // html.classList.remove(outlineClass);
    console.log('de-activate spacing');
}

export { manageSpecsSpacing };