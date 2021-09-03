import { getMessage, insertScript } from '@carbon/devtools-utilities';

// https://carbon-devtools-token-server.us-south.cf.appdomain.cloud/packages/elements.js

function insertasdf(callback) {
  // initial validation script to determine whether extension runs or not
  insertScript(
    null,
    {
      file:
        'https://carbon-devtools-token-server.us-south.cf.appdomain.cloud/packages/elements.js',
      allFrames: true,
      matchAboutBlank: true,
    },
    () => {
      // helps prevent breaking on runtime
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        // TODO: provide feedback to the user if something goes wrong
      } else if (typeof callback === 'function') {
        callback();
      }
    }
  );
}

/// WHEN POP UP IS OPENED VALIDATE PAGE
function validatePage() {
  getMessage((msg) => {
    if (msg.popup) {
      insertasdf();
      insertValidation();
    }
  });
}

function insertValidation(callback) {
  // initial validation script to determine whether extension runs or not
  insertScript(
    null,
    {
      file: '/validate/index.js',
      allFrames: true,
      matchAboutBlank: true,
    },
    () => {
      // helps prevent breaking on runtime
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        // TODO: provide feedback to the user if something goes wrong
      } else if (typeof callback === 'function') {
        callback();
      }
    }
  );
}

export { validatePage };
