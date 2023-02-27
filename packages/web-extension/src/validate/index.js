import { sendMessage } from '@carbon/devtools-utilities/src/sendMessage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { prefixSelectors } from '../globals/prefixSelectors';

injectScript();

function sendValidation() {
  const carbonComponents = document.querySelector(prefixSelectors);
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');
  const keywords = document.querySelector('meta[name="keywords"]');

  const pageInfo = {
    // do as much as we can here since this code is already injected, and to avoid larger stringifys in dataset attributes.
    Northstar: northstarCheck(),
    title: title && title.innerText,
    description: description && description.getAttribute('content'),
    keywords:
      keywords &&
      keywords
        .getAttribute('content')
        .split(',')
        .map((keyword) => keyword.trim())
        .filter((k) => k),
    location: {
      domain: window.location.domain,
      host: window.location.host,
      hostname: window.location.hostname,
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      port: window.location.port,
      protocol: window.location.protocol,
      search: window.location.search,
      hash: window.location.hash,
    },
    language: html.getAttribute('lang'),
  };

  const msg = {
    windowWidth: window.outerWidth,
    carbonDevtoolsInjected: window.carbonDevtoolsInjected || false,
    pageInfo: {
      ...pageInfo,
      ...JSON.parse(body.dataset.pageInfo),
    },
  };

  delete body.dataset.pageInfo;

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
        const cssURL = chrome.runtime.getURL('/inject/index.css');

        if (!document.querySelector(`[href="${cssURL}"]`)) {
          injectStyles(cssURL);
        }
      }
    }

    sendMessage(msg);
  });
}

function northstarCheck() {
  const versions = [
    'v8',
    'v9',
    'v10',
    'v11',
    'v12',
    'v13',
    'v14',
    'v15',
    'v16',
    'v17',
    'v17e',
    'v18',
    'v19',
    'v19a',
  ];
  const results = {
    versions: {},
    numOfFiles: 0,
  };

  performance.getEntriesByType('resource').forEach((entry) => {
    versions.forEach((versions) => {
      if (entry.name.indexOf('common/' + versions + '/') > -1) {
        results.versions[versions] = true;
        results.numOfFiles += 1;
      }
    });
  });

  if (results.numOfFiles) {
    return results;
  }
}

function injectStyles(url) {
  var elem = document.createElement('link');
  elem.rel = 'stylesheet';
  elem.setAttribute('href', url);
  document.head.appendChild(elem);
}

function injectScript() {
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('/validate/validationScript.js');
  s.onload = function () {
    this.remove();

    // Insert pageInfo by loaded script then sendValidation
    sendValidation();
  };
  (document.head || document.documentElement).appendChild(s);
}
