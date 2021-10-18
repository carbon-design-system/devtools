import { gaNavigationEvent } from './ga';

function openChromeExtensionOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }

  gaNavigationEvent('click', 'settings');
}

export { openChromeExtensionOptions };
