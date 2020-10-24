import {
  experimentalStatusChanged,
  getExperimentalStatus,
} from '@carbon/devtools-utilities';
import { magenta } from '@carbon/colors';

let iconColor = '#888D94';

function setBadge() {
  experimentalStatusChanged(updateBadgeByRules);
  getExperimentalStatus(updateBadgeByRules);
}

function updateBadgeByRules(experimental) {
  const dev = process.env.NODE_ENV === 'development';

  if (experimental && dev) {
    createBadge('DEV', magenta[50]);
  } else if (experimental) {
    createBadge('EXP', magenta[50]);
  } else if (dev) {
    createBadge('DEV', iconColor);
  } else {
    createBadge('', iconColor);
  }
}

function createBadge(text, color) {
  chrome.browserAction.setBadgeText({ text: text });
  chrome.browserAction.setBadgeBackgroundColor({ color: color });
}

export { setBadge, createBadge };
