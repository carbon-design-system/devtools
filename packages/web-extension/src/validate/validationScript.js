bxDevGetLibraries();

function bxDevGetLibraries() {
  const libraries = {
    'IBM Analytics':
      window._ibmAnalytics ||
      document.querySelector('script[src*="common/stats/ibm-common.js"]') ||
      undefined,
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
    libraries,
  };

  if (libraries.jQuery) {
    // try to get version number
    try {
      // let's try to see if there are more than one version lurking in the shadows
      const versions = [];
      Object.keys(window).forEach((key) => {
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

  if (libraries.Dojo) {
    // try to get version number
    libraries.Dojo =
      (libraries.Dojo.version && libraries.Dojo.version.toString()) || true;
  }

  if (libraries.Bootstrap) {
    // try to get version number
    libraries.Bootstrap =
      (libraries.Bootstrap.Alert && libraries.Bootstrap.Alert.VERSION) || true;
  }

  if (libraries.Vue) {
    // try to get version number
    libraries.Vue = (libraries.Vue && libraries.Vue.version) || true;
  }

  if (libraries.React) {
    // try to get version number
    libraries.React = libraries.React.version || true;
  } else {
    libraries.React = findReactRoot();
  }

  if (libraries.Angular) {
    libraries.Angular =
      (window.angular.version && window.angular.version.full) || true;
  } else {
    const angularRoot =
      window.getAllAngularRootElements && window.getAllAngularRootElements();

    if (angularRoot) {
      if (angularRoot.length) {
        libraries.Angular = angularRoot[0].getAttribute('ng-version') || true;
      } else {
        libraries.Angular = true;
      }
    }
  }

  if (libraries['IBM Analytics']) {
    const analytics = libraries['IBM Analytics'];
    if (analytics.ver) {
      libraries['IBM Analytics'] = analytics.ver.libraryVersion || true;
    } else {
      libraries['IBM Analytics'] = true;
    }
  }

  document.body.dataset.pageInfo = JSON.stringify(pageInfo);
}

function findReactRoot(elem) {
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
