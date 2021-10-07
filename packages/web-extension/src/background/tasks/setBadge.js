import {
  experimentalStatusChanged,
  getExperimentalStatus,
} from '@carbon/devtools-utilities/src/experimental';
import { magenta } from '@carbon/colors';
import { defaults } from '../../globals/defaults';

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
  chrome.browserAction.setBadgeText({ text: text });
  chrome.browserAction.setBadgeBackgroundColor({ color: color });
}

function manageIcon() {
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

function setIcon(darkTheme) {
  if (darkTheme) {
    chrome.browserAction.setIcon({ path: '/media/16x16-dark.png' });
  } else {
    chrome.browserAction.setIcon({ path: '/media/16x16-light.png' });
  }

  updateBadgeByRules();
}

export { setBadge, createBadge };
