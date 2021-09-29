import settings from 'carbon-components/es/globals/js/settings';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';
import { randomId } from '@carbon/devtools-utilities/src/randomId';
import { findSingleDomShadow } from '@carbon/devtools-utilities/src/shadowDom';
import { removeAllHighlights } from '../Highlight';
import { showHideTooltip } from '../Tooltip';
import {
  // manageSpecsOutline,
  // manageSpecsWireframe,
  highlightSpecsType,
  highlightSpecsColor,
  highlightSpecsDependencies,
  highlightSpecsSpacing,
  resetAllSpacers,
  mouseOutSpacing,
  highlightSpecsGrid,
  highlightSpecsRatio,
} from './collection';

const { prefix } = settings;

const html = document.querySelector('html');
const specsClass = `${prefix}--specs`;

const ignoreNodes = ['BODY', '#document-fragment']; // nodes to ignore below

const specToolOptions = {
  typography: highlightSpecsType,
  color: highlightSpecsColor,
  dependencies: highlightSpecsDependencies,
  spacing: highlightSpecsSpacing,
  grid: highlightSpecsGrid,
  ratio: highlightSpecsRatio,
};

const state = {
  specs: false,
  specType: false,
};

let shadowEventCollection = [];

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

function manageSpecs({ specs }) {
  // , specType
  if (specs) {
    addSpecs();
  } else {
    removeSpecs();
  }

  // manageSpecsOutline(specs, specType); // this one is different than the others...
  // manageSpecsWireframe(specs, specType);
}

function addSpecs() {
  html.classList.add(specsClass);
  document.body.addEventListener('mouseover', mouseOver);
  document.body.addEventListener('mouseout', mouseOut);
}

function removeSpecs() {
  html.classList.remove(specsClass);
  document.body.removeEventListener('mouseover', mouseOver);
  document.body.removeEventListener('mouseout', mouseOut);
  cleanUpShadowEvents();
}

function mouseOver(e) {
  let target = e.srcElement || e;

  setShadowEvents(target);

  if (target && ignoreNodes.indexOf(target.nodeName) === -1) {
    // ignore certain nodes
    let targetFound = false;
    const optionKeys = Object.keys(specToolOptions);

    if (optionKeys.indexOf(state.specType) > -1) {
      for (let i = 0; i < optionKeys.length; i++) {
        const option = optionKeys[i];
        if (state.specType === option) {
          targetFound = specToolOptions[option](target);
          break;
        }
      }

      if (!targetFound) {
        mouseOver(getShadowParent(target));
      } else {
        document.addEventListener('scroll', clearOnScroll, true);
      }
    }
  }
}

function mouseOut(e, bypass) {
  if (state.specType === 'spacing') {
    if (mouseOutSpacing(e) || bypass) {
      // special condition when spacing is present
      resetSpecs(e);
      resetAllSpacers();
    }
  } else {
    resetSpecs(e);
  }
}

function clearOnScroll() {
  resetSpecs();
  resetAllSpacers();
}

function resetSpecs() {
  showHideTooltip(false);
  removeAllHighlights();
  document.removeEventListener('scroll', clearOnScroll, true);
}

// shadow management
// should these live in utilities?
function cleanUpShadowEvents() {
  if (shadowEventCollection.length) {
    for (let i = 0; i < shadowEventCollection.length; i++) {
      shadowEventCollection[i].removeEventListener(
        'mouseover',
        shadowMouseOver
      );
      shadowEventCollection[i].removeEventListener('mouseout', shadowMouseOut);
    }

    shadowEventCollection = [];
  }
}

function setShadowEvents(target) {
  // does it have a shadow root?
  // add an event listener
  if (target.shadowRoot) {
    target.dataset.shadowId = randomId();
    const children = [...target.shadowRoot.children];

    if (children.length) {
      children.forEach((child) => {
        child.dataset.shadowParent = target.dataset.shadowId; // skip shadow dom and provide reference to parent

        child.addEventListener('mouseover', shadowMouseOver);
        child.addEventListener('mouseout', shadowMouseOut);

        shadowEventCollection.push(child);
      });
    }
  }
}

function shadowMouseOver(e) {
  let target = e.srcElement || e;

  if (target.dataset.shadowParent) {
    mouseOut(e, true);
  }

  mouseOver(target);
}

function shadowMouseOut(e) {
  mouseOut(e);
}

function getShadowParent(target) {
  let parent = target.parentNode;

  if (target.dataset.shadowParent) {
    parent = findSingleDomShadow(
      `[data-shadow-id="${target.dataset.shadowParent}"]`
    );
  }

  return parent;
}

export { initSpecs };
