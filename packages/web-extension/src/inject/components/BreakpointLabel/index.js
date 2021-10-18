import settings from 'carbon-components/es/globals/js/settings';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';
// import { defaults } from '../../../globals/defaults';

const { prefix } = settings;

function initBreakpointLabel() {
  getStorage('toggleBreakpointLabel', ({ toggleBreakpointLabel }) =>
    manageToggleBreakpointLabel(toggleBreakpointLabel)
  ); // set based on defaults
  storageItemChanged('toggleBreakpointLabel', manageToggleBreakpointLabel); // update ui if options change
}

function manageToggleBreakpointLabel(toggleBreakpointLabel) {
  const html = document.querySelector('html');

  // hide or show breakpoint label
  if (toggleBreakpointLabel) {
    html.classList.add(`${prefix}--breakpoint-label`);
  } else {
    html.classList.remove(`${prefix}--breakpoint-label`);
  }
}

export { initBreakpointLabel };
