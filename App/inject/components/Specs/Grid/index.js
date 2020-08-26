import { settings } from 'carbon-components'
import { carbonPrefix } from '../../../../globals';

const { prefix } = settings;

const html = document.querySelector('html');
// const outlineClass = `${prefix}--specs--outline`;

function manageSpecsGrid (specs, specType) {
    if (specs && specType === 'grid') {
        activateGrid();
    } else {
        deactivateGrid();
    }
}

function activateGrid () {
    // html.classList.add(outlineClass);

    // .bx--grid, .bx--row, .bx--col, .bx--col-sm-#, .bx--col-md-# ...
    // add highlight
    // add tooltip
    console.log(carbonPrefix);
}

function deactivateGrid () {
    // html.classList.remove(outlineClass);
}

export { manageSpecsGrid };