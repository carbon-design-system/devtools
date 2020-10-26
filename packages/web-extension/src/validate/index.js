import { sendMessage, getStorage } from '@carbon/devtools-utilities';
import { prefixSelectors } from '../globals';

const scriptId = 'bx-dev--window-var';

injectScript(
  `
  document.body.dataset.digitalData = JSON.stringify(window.digitalData || false);
  document.body.dataset.jQuery = JSON.stringify(Boolean(window.$ || window.jQuery || false));
  document.querySelector('#${scriptId}').remove();
`,
  scriptId
);

sendValidation();

function sendValidation() {
  const carbonComponents = document.querySelector(prefixSelectors);
  const body = document.body;

  const msg = {
    windowWidth: window.outerWidth,
    carbonDevtoolsInjected: window.carbonDevtoolsInjected || false,
    digitalData: JSON.parse(body.dataset.digitalData),
    jQuery: JSON.parse(body.dataset.jQuery),
    // TODO: add window validations here.
  };

  delete body.dataset.digitalData;
  delete body.dataset.jQuery;

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

function injectScript(content, id) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', id);
  script.innerHTML = content;
  document.body.appendChild(script);
}
