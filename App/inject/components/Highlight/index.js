import { settings } from 'carbon-components';

const { prefix } = settings;

const highlightClass = `${prefix}--highlight`;
const relativeClass = `${highlightClass}--relative`;
const outlineClass = `${highlightClass}--outline`;

function addHighlight (component, type = '', options = {}) {
    if (type) {
        type = '--' + type; // "specs" type becomes "--specs"
    }
    
    if (options.outline) {
        component.classList.add(outlineClass);
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
    component.classList.remove(outlineClass);
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
     && position !== 'relative'
     && position !== 'sticky') {
        component.classList.add(relativeClass);
    }
}

export {
    addHighlight,
    removeHighlight,
    removeAllHighlights
};