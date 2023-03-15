import {
  experimentalStatusChanged,
  getExperimentalStatus,
} from '@carbon/devtools-utilities/src/experimental';
import { magenta } from '@carbon/colors';
import { defaults } from '../../globals/defaults';
import { isManifestV3 } from '@carbon/devtools-utilities/src/isManifestV3';

let iconColor = '#888D94';
let experimental = defaults.generalSettings.experimental;

function setBadge() {
  manageIcon();
  experimentalStatusChanged(manageExperimentalBadge);
  getExperimentalStatus(manageExperimentalBadge);
}

function manageExperimentalBadge(status) {
  experimental = status;
  updateBadgeByRules();
}

function updateBadgeByRules() {
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
  if (isManifestV3()) {
    chrome.action.setBadgeText({ text: text });
    chrome.action.setBadgeBackgroundColor({ color: color });
  } else {
    chrome.browserAction.setBadgeText({ text: text });
    chrome.browserAction.setBadgeBackgroundColor({ color: color });
  }
}

// https://github.com/w3c/ServiceWorker/issues/1577
function manageIcon() {
  if (!isManifestV3()) {
    if (window.matchMedia) {
      let manualListener;

      setIcon(window.matchMedia('(prefers-color-scheme: dark)').matches);

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          window.clearInterval(manualListener);
          manualListener = true;
          setIcon(e.matches);
        });

      if (!manualListener) {
        manualListener = window.setInterval(() => {
          setIcon(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }, 1000);
      }
    }
  }
}

function setIcon(darkTheme) {
  if (isManifestV3()) {
    darkTheme
      ? chrome.action.setIcon({ path: '/media/16x16-dark.png' })
      : chrome.action.setIcon({ path: '/media/16x16-light.png' });
  } else {
    darkTheme
      ? chrome.browserAction.setIcon({ path: '/media/16x16-dark.png' })
      : chrome.browserAction.setIcon({ path: '/media/16x16-light.png' });
  }

  updateBadgeByRules();
}

export { setBadge, createBadge };
