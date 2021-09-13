import settings from 'carbon-components/es/globals/js/settings';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';
import {
  manageSpecsColor,
  manageSpecsDependencies,
  manageSpecsGrid,
  manageSpecsOutline,
  manageSpecsRatio,
  manageSpecsSpacing,
  manageSpecsType,
  // manageSpecsWireframe,
} from './collection';

const { prefix } = settings;

const html = document.querySelector('html');
const specsClass = `${prefix}--specs`;
const state = {
  specs: false,
  specType: false,
};

function initSpecs() {
  // set onload based on defaults
  getStorage(
    ['globalToggleStates', 'toggleSpecs'],
    ({ globalToggleStates, toggleSpecs }) => {
      manageSpecsState('specs', globalToggleStates.specs);
      manageSpecsState('specType', toggleSpecs);
    }
  );

  // update ui if options change
  storageItemChanged('globalToggleStates', ({ specs }) =>
    manageSpecsState('specs', specs)
  );
  storageItemChanged('toggleSpecs', (toggleSpecs) =>
    manageSpecsState('specType', toggleSpecs)
  );
  storageItemChanged('generalExperimental', () => manageSpecs(state));
}

function manageSpecsState(type, value) {
  if (state[type] !== value) {
    // if the current state value doesn't match the new value that means
    // something changed and we need to update the ui using manageSpecs().
    state[type] = value;
    manageSpecs(state);
  }
}

function manageSpecs({ specs, specType }) {
  if (specs) {
    addSpecs();
  } else {
    removeSpecs();
  }

  manageSpecsColor(specs, specType);
  manageSpecsDependencies(specs, specType);
  manageSpecsGrid(specs, specType);
  manageSpecsOutline(specs, specType);
  manageSpecsRatio(specs, specType);
  manageSpecsSpacing(specs, specType);
  manageSpecsType(specs, specType);
  // manageSpecsWireframe(specs, specType);
}

function addSpecs() {
  html.classList.add(specsClass);
}

function removeSpecs() {
  html.classList.remove(specsClass);
}

export { initSpecs };
