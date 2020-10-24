import { getMessage, insertScript } from '@carbon/devtools-utilities';

/// WHEN POP UP IS OPENED VALIDATE PAGE
function validatePage() {
  getMessage((msg) => {
    if (msg.popup) {
      insertValidation();
    }
  });
}

function insertValidation(callback) {
  insertScript(
    null,
    {
      file: '/validate/index.js',
      allFrames: true,
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

export { validatePage };
