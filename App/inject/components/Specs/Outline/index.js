import { settings } from 'carbon-components';

const { prefix } = settings;

const html = document.querySelector('html');
const outlineClass = `${prefix}--specs--outline`;

function manageOutline (specs, specType) {
    console.log('manageOutline()', specs, specType);
    if (specs && specType === 'outline') {
        addOutline();
    } else {
        removeOutline();
    }
}

function addOutline () {
    html.classList.add(outlineClass);
}

function removeOutline () {
    html.classList.remove(outlineClass);
}

export { manageOutline };