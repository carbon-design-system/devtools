import { sendMessage, getStorage } from '@carbon/devtools-utilities';
import { prefixSelectors } from '../globals';

sendValidation();

function sendValidation() {
  const carbonComponents = document.querySelector(prefixSelectors);

  const msg = {
    windowWidth: window.outerWidth,
    carbonDevtoolsInjected: window.carbonDevtoolsInjected || false,
  };

  getStorage(['generalNonCarbon'], ({ generalNonCarbon }) => {
    // at least components on page
    // or user chooses to ignore carbon validation
    if (generalNonCarbon || carbonComponents) {
      msg.runningCarbon = true;
      msg.ignoreValidation = generalNonCarbon;
    }

    // inject css via this method for development purposes
    if (process.env.NODE_ENV === 'development' && !msg.carbonDevtoolsInjected) {
      if (msg.ignoreValidation || msg.runningCarbon) {
        const cssURL = chrome.extension.getURL('/inject/index.css');

        if (!document.querySelector(`[href="${cssURL}"]`)) {
          injectStyles(cssURL);
        }
      }
    }

    sendMessage(msg);
  });
}

function injectStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.head.appendChild(elem);
}
