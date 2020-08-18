import { settings } from 'carbon-components';

const { prefix } = settings;

const highlightClass = `${prefix}--highlight`;
const relativeClass = `${highlightClass}--relative`;

function addHighlight (component, type = '') {
    if (type) {
        type = '--' + type; // "specs" type becomes "--specs"
    }

    addRelativeOrNot(component);
    component.classList.add(highlightClass + type);
}

function removeHighlight (component, type) {
    if (type) {
        type = '--' + type; // "specs" type becomes "--specs"
    }

    component.classList.remove(highlightClass + type);
    component.classList.remove(relativeClass);
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
    removeHighlight
};