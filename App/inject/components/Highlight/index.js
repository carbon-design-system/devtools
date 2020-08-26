import { settings } from 'carbon-components';

const { prefix } = settings;

const highlightClass = `${prefix}--highlight`;
const relativeClass = `${highlightClass}--relative`;

function addHighlight (component, type = '') {
    if (type) {
        type = '--' + type; // "specs" type becomes "--specs"
    }

    addRelativeOrNot(component);
    component.classList.add(highlightClass);
    component.classList.add(highlightClass + type);
}

function removeHighlight (component, type) {
    if (type) {
        type = '--' + type; // "specs" type becomes "--specs"
    }

    component.classList.remove(highlightClass);
    component.classList.remove(highlightClass + type);
    component.classList.remove(relativeClass);
}

function removeAllHighlights () {
    const comps = document.querySelectorAll('.' + highlightClass);

    if (comps.length > 0) {
        for (let i = 0; i < comps.length; i += 1) {
            removeHighlight(comps[i], 'grid');
            removeHighlight(comps[i], 'specs');
            removeHighlight(comps[i], 'inventory');
        }
    }
}

function addRelativeOrNot (component) {
    const position = getComputedStyle(component).position;

    if (position !== 'fixed'
     && position !== 'absolute'
     && position !== 'relative') {
        component.classList.add(relativeClass);
    }
}

export {
    addHighlight,
    removeHighlight,
    removeAllHighlights
};