import { settings } from 'carbon-components';
import { getStorage, storageChanged } from '../../../utilities';
import { manageOutline } from './collection';

const { prefix } = settings;

const html = document.querySelector('html');
const specsClass = `${prefix}--specs`;
const state = {
    specs: false,
    specType: false
};

// globalToggleStates.specs
// toggleSpecs.outline

function initSpecs () {
     // set onload based on defaults
    getStorage(['globalToggleStates', 'toggleSpecs'], ({ globalToggleStates, toggleSpecs }) => {
        manageSpecsState('specs', globalToggleStates.specs);
        console.log(toggleSpecs);
        manageSpecsState('specType', toggleSpecs);
    });

    // update ui if options change
    storageChanged('globalToggleStates', ({ specs }) => manageSpecsState('specs', specs));
    storageChanged('toggleSpecs', toggleSpecs => manageSpecsState('specType', toggleSpecs));
}

function manageSpecsState (type, value) {
    console.log(type, value);
    if (state[type] !== value) {
        state[type] = value;
        console.log(value, state);
        manageSpecs(state);
    }
}

function manageSpecs ({ specs, specType }) {
    if (specs) {
        addSpecs();
    } else {
        removeSpecs();
    }

    manageOutline(specs, specType);
}

function addSpecs () {
    html.classList.add(specsClass);
}

function removeSpecs () {
    html.classList.remove(specsClass);
}

export { initSpecs };