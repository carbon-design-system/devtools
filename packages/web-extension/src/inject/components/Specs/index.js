import { settings } from 'carbon-components';
import { getStorage, storageItemChanged } from '@carbon/devtools-utilities';
import {
  manageSpecsColor,
  manageSpecsDependencies,
  manageSpecsGrid,
  manageSpecsOutline,
  manageSpecsRatio,
  manageSpecsSpacing,
  manageSpecsType,
  manageSpecsWireframe,
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
}

function manageSpecsState(type, value) {
  if (state[type] !== value) {
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
  manageSpecsWireframe(specs, specType);
}

function addSpecs() {
  html.classList.add(specsClass);
}

function removeSpecs() {
  html.classList.remove(specsClass);
}

export { initSpecs };
