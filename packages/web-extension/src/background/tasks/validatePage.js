import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import {
  insertScript,
  insertScriptManifestV3,
} from '@carbon/devtools-utilities/src/insertScript';
import { activeTabAsync } from '@carbon/devtools-utilities/src/activeTab';
import { isManifestV3 } from '@carbon/devtools-utilities/src/isManifestV3';

/// WHEN POP UP IS OPENED VALIDATE PAGE
function validatePage() {
  getMessage((msg) => {
    if (msg.popup) {
      insertValidation();
    }
  });
}

function insertValidation(callback) {
  getStorage(['generalNonCarbon'], async ({ generalNonCarbon }) => {
    if (isManifestV3()) {
      const { id: tabId } = await activeTabAsync();
      insertScriptManifestV3(
        {
          files: ['/validate/index.js'],
          target: {
            allFrames: !generalNonCarbon, // only top level injection if non carbon option is selected
            tabId,
          },
        },
        () => {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          } else if (typeof callback === 'function') {
            callback();
          }
        }
      );
    } else {
      insertScript(
        null,
        {
          file: '/validate/index.js',
          allFrames: !generalNonCarbon, // only top level injection if non carbon option is selected
          matchAboutBlank: true,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          } else if (typeof callback === 'function') {
            callback();
          }
        }
      );
    }
  });
}

export { validatePage };
