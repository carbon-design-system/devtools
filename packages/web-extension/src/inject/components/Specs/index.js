import settings from 'carbon-components/es/globals/js/settings';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';
import { randomId } from '@carbon/devtools-utilities/src/randomId';
import { findSingleDomShadow } from '@carbon/devtools-utilities/src/shadowDom';
import { removeAllHighlights } from '../Highlight';
import { showHideTooltip } from '../Tooltip';
import { defaults } from '../../../globals/defaults';
import {
  manageSpecsOutline,
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
  specs: defaults.global.specs,
  specType: defaults.specs.type,
  specOutline: defaults.specs.outline,
};

let shadowEventCollection = [];
let _noPointerRef = [];

function initSpecs() {
  // set onload based on defaults
  getStorage(
    ['globalToggleStates', 'toggleSpecs'],
    ({ globalToggleStates, toggleSpecs }) => {
      manageSpecsState('specs', globalToggleStates.specs);
      manageSpecsState('specType', toggleSpecs.type);
      manageSpecsState('specOutline', toggleSpecs.outline);
    }
  );

  // update ui if options change
  storageItemChanged('globalToggleStates', ({ specs }) =>
    manageSpecsState('specs', specs)
  );
  storageItemChanged('toggleSpecs', (toggleSpecs) => {
    manageSpecsState('specType', toggleSpecs.type);
    manageSpecsState('specOutline', toggleSpecs.outline);
  });
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

function manageSpecs({ specs, specOutline }) {
  if (specs) {
    addSpecs();
  } else {
    removeSpecs();
  }

  manageSpecsOutline(specs, specOutline);
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
  removeNoPointers();
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

      injectNoPointer(target);

      if (!targetFound) {
        mouseOver(getShadowParent(target));
      } else {
        document.addEventListener('scroll', clearOnScroll, true);
      }
    }
  }
}

function injectNoPointer(target) {
  // This solves a pretty extreme edge case where carbon for ibm.com is setting a pseudo element over
  // their cards to fix an accessibility problem and in turn blocking our mouse events.
  // This solution looks for those pseudo elements with an inste of `0px` and sets its pointer
  // events to none so we can see underneath temporarily.
  // This seems a little intense to touch the dom this much, but it works for now.
  const obstruction = window.getComputedStyle(target, ':after');

  if (obstruction.inset !== 'auto' && obstruction.pointerEvents !== 'none') {
    const className = `${prefix}--no-pointer`;
    const parent = target.parentNode;
    let style = parent.querySelector(`style.${className}`);

    if (!style) {
      style = document.createElement('style');
      style.classList.add(className);
      style.innerHTML = `
                *::after {
                    pointer-events: none;
                }
            `;

      parent.prepend(style);
      _noPointerRef.push(style);
    }
  }
}

function removeNoPointers() {
  if (_noPointerRef.length) {
    _noPointerRef.forEach((ref) => {
      ref.remove();
    });

    _noPointerRef = [];
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
