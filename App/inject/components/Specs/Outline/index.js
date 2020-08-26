import { settings } from 'carbon-components';

const { prefix } = settings;

const html = document.querySelector('html');
const outlineClass = `${prefix}--specs--outline`;

function manageSpecsOutline (specs, specType) {
    if (specs && specType === 'outline') {
        activateOutline();
    } else {
        deactiveOutline();
    }
}

function activateOutline () {
    html.classList.add(outlineClass);
}

function deactiveOutline () {
    html.classList.remove(outlineClass);
}

export { manageSpecsOutline };