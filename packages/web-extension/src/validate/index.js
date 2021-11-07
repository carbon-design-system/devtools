import { sendMessage } from '@carbon/devtools-utilities/src/sendMessage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { prefixSelectors } from '../globals/prefixSelectors';

const scriptId = 'bx-dev--window-var';

injectScript(
  `
  bxDevGetLibraries();

  function bxDevGetLibraries () {
    const libraries = {
      "IBM Analytics": window._ibmAnalytics || document.querySelector('script[src*="common/stats/ibm-common.js"]') || undefined,
      Kaltura: (window.kWidget || window.KWidget) && true,
      w3DS: window.w3ds && true,
      React: window.React,
      Angular: window.angular,
      jQuery: window.jQuery || window.$,
      Dojo: window.dojo,
      Bootstrap: window.bootstrap,
      Vue: window.Vue,
    };

    const pageInfo = {
      digitalData: window.digitalData,
      libraries
    };

    if (libraries.jQuery) { // try to get version number
      try {
        // let's try to see if there are more than one version lurking in the shadows
        const versions = [];
        Object.keys(window).forEach(key => {
          if (key.indexOf('jQuery') === 0 || key.indexOf('$') === 0) {
            if (typeof window[key] === 'function') {
              const version = window[key]().jquery;
              if (version) {
                versions.push(version);
              }
            }
          }
        });

        libraries.jQuery = versions.length ? versions : true;
      } catch (e) {
        libraries.jQuery = libraries.jQuery().jquery || true;
      }
    }

    if (libraries.Dojo) { // try to get version number
      libraries.Dojo = (libraries.Dojo.version && libraries.Dojo.version.toString()) || true;
    }

    if (libraries.Bootstrap) { // try to get version number
      libraries.Bootstrap = (libraries.Bootstrap.Alert && libraries.Bootstrap.Alert.VERSION) || true;
    }

    if (libraries.Vue) { // try to get version number
      libraries.Vue = (libraries.Vue && libraries.Vue.version) || true;
    }

    if (libraries.React) { // try to get version number
      libraries.React = libraries.React.version || true;
    } else {
      libraries.React = findReactRoot();
    }

    if (libraries.Angular) {
      libraries.Angular = (window.angular.version && window.angular.version.full) || true;
    } else {
      const angularRoot = window.getAllAngularRootElements && window.getAllAngularRootElements();

      if (angularRoot) {
        if (angularRoot.length) {
          libraries.Angular = angularRoot[0].getAttribute('ng-version') || true;
        } else {
          libraries.Angular= true;
        }
      }
    }

    if (libraries["IBM Analytics"]) {
      const analytics = libraries["IBM Analytics"];
      if (analytics.ver) {
        libraries["IBM Analytics"] = analytics.ver.libraryVersion || true;
      } else {
        libraries["IBM Analytics"] = true;
      }
    }

    document.body.dataset.pageInfo = JSON.stringify(pageInfo);
  }

  function findReactRoot (elem) {
    elem = elem || document.querySelector('body');
    const children = elem.children;
    let result;

    for (let i = 0; i < children.length; i++) {
      if (children[i]._reactRootContainer) {
        result = true;
        break;
      } else {
        findReactRoot(children[i]);
      }
    }

    return result;
  }

  document.querySelector('#${scriptId}').remove();
`,
  scriptId
);

sendValidation();

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
        const cssURL = chrome.extension.getURL('/inject/index.css');

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

function injectScript(content, id) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('id', id);
  script.innerHTML = content;
  document.body.appendChild(script);
}
