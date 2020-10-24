import { getStorage, setStorage } from '@carbon/devtools-utilities';
import {
  initToggleColumns,
  addGridInteraction,
  removeGridInteraction,
} from './toggleColumns';

const holdingKeys = [];

function manageShortcuts() {
  const shift = 16;
  const control = 17;

  // shift + ctrl
  if (holdingKeys.indexOf(shift) > -1 && holdingKeys.indexOf(control) > -1) {
    // base conditions satified
    toggleEverything(0);
    toggle2xGrid(1);
    toggleMiniUnitGrid(2);
    toggleBreakpointLabel(3);
  }
}

function toggleEverything(num) {
  numberShortcut(num, () => {
    toggleDataOptions('globalToggleStates', 'gridoverlay');
  });
}

function toggle2xGrid(num) {
  numberShortcut(num, () => toggleDataOptions('toggleGrids', 'toggle2xGrid'));
}

function toggleMiniUnitGrid(num) {
  numberShortcut(num, () =>
    toggleDataOptions('toggleGrids', 'toggleMiniUnitGrid')
  );
}

function toggleBreakpointLabel(num) {
  numberShortcut(num, () =>
    toggleDataOptions('toggle2xGridOptions', 'toggle2xBreakpoints')
  );
}

function toggleDataOptions(group, option) {
  getStorage(group, (data) => {
    const options = data[group];

    if (options && Object.keys(options).indexOf(option) > -1) {
      if (options[option]) {
        options[option] = false;
      } else {
        options[option] = true;
      }

      setStorage(data);
    }
  });
}

function numberShortcut(num, callback) {
  if (num >= 0 && num <= 9) {
    const shortcutNum = 48 + num; // 1-9 = 48 - 57

    if (
      holdingKeys.length === 3 &&
      holdingKeys.indexOf(shortcutNum) > -1 &&
      typeof callback === 'function'
    ) {
      callback();
    }
  }
}

function addKey(key) {
  if (holdingKeys.indexOf(key) < 0) {
    holdingKeys.push(key);
  }
}

function removeKey(key) {
  const keyIndex = holdingKeys.indexOf(key);

  if (keyIndex > -1) {
    holdingKeys.splice(keyIndex, 1);
  }
}

function initShortcuts() {
  document.addEventListener('keydown', (e) => {
    addKey(e.keyCode);
    manageShortcuts();
    addGridInteraction(holdingKeys);
  });

  document.addEventListener('keyup', (e) => {
    removeGridInteraction(holdingKeys);
    removeKey(e.keyCode);
  });
  initToggleColumns();
}

export { initShortcuts };
