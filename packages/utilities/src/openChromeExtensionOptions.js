import { gaNavigationEvent } from './ga';
import { isManifestV3 } from './isManifestV3';

function openChromeExtensionOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    if (isManifestV3()) {
      window.open(chrome.runtime.getURL('options.html'));
    } else {
      chrome.tabs.create({
        url: chrome.runtime.getURL('page.html'),
        active: true,
      });
    }
  }

  gaNavigationEvent('click', 'settings');
}

export { openChromeExtensionOptions };
