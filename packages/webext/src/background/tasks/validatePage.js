import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { insertScriptManifestV3 } from '@carbon/devtools-utilities/src/insertScript';
import { activeTabAsync } from '@carbon/devtools-utilities/src/activeTab';

/// WHEN POP UP IS OPENED VALIDATE PAGE
function validatePage() {
  getMessage((msg) => {
    if (msg.popup) {
      console.log('popup open detected.');

      insertValidation();
    }
  });
}

function insertValidation(callback) {
  getStorage(['generalNonCarbon'], async ({ generalNonCarbon }) => {
    const tab = await activeTabAsync();

    if (tab) {
      insertScriptManifestV3(
        {
          files: ['/src/validate/index.js'],
          target: {
            allFrames: !generalNonCarbon, // only top level injection if non carbon option is selected
            tabId: tab.id,
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
    }

  });
}

export { validatePage };
