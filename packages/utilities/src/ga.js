import url from 'url';
import {
  setStorage,
  getStorage,
  activeTab,
  randomId,
  getActiveBreakpoint,
} from '../';
import { defaults } from '../../web-extension/src/globals/defaults';

const gaUniversalId = 'UA-28030649-4';
const ga4Id = 'G-6XT1J9FV92';
const ga4API = 'AE_MzhBNSh2Ft9C6Csjc4Q';
let setPath, setTitle;

function sendGaResponse(universalData = {}) {
  activeTab((tab) => {
    getStorage(
      [
        'version',
        'clientId',
        'isIBMer',
        'gridVersion',
        'generalTheme',
        'generalExperimental',
        'generalNonCarbon',
      ],
      ({
        version,
        isIBMer = defaults.ga.isIBMer,
        clientId = defaults.ga.clientId,
        gridVersion = defaults.ga.gridVersion,
        generalTheme = defaults.ga.generalTheme,
        generalExperimental = defaults.ga.generalExperimental,
        generalNonCarbon = defaults.ga.generalNonCarbon,
      }) => {
        // building default responses
        universalData.v = 1; // universal: version number
        universalData.cid = clientId; // universal: client id
        universalData.uid = clientId; // universal: user id
        universalData.ul = window.navigator.language.toLowerCase(); // universal: user language
        universalData.dp = setPath; // universal: Document Path
        universalData.dt = setTitle; // universal: Document Title
        universalData.cd1 = process.env.NODE_ENV; // universal: development or production
        universalData.cd2 = version; // universal: extension version
        universalData.cd3 = gridVersion; // universal: grid version
        universalData.cd4 = String(generalExperimental); // universal: boolean experimental
        universalData.cd5 = String(generalNonCarbon); // universal: boolean ignore validation
        universalData.cd6 = generalTheme; // universal: theme
        universalData.cd8 = isIBMer; // universal: IBMer from ddo

        if (tab) {
          if (tab.width && tab.height) {
            universalData.vp = `${tab.width}x${tab.height}`; // universal: viewport
            universalData.cd7 = getActiveBreakpoint(tab.width).active; // universal: breakpoint
          }

          if (tab.url) {
            if (universalData.ec && universalData.ec === 'dom') {
              const tabURL = url.parse(tab.url);

              universalData.dt = tab.title; // universal: Document Title
              universalData.dl = tab.url; // universal: document url
              universalData.dh = tabURL.host; // universal: document host
              universalData.dp = tabURL.path; // universal: Document Path
            } else {
              universalData.dr = tab.url; // universal: tab url
            }
          }
        }

        // legacy universal
        fetch('https://www.google-analytics.com/collect', {
          method: 'POST',
          body: buildGaResponse(universalData, gaUniversalId),
        });

        sendGa4Response(universalData);
      }
    );
  });
}

function sendGa4Response(data) {
  // testing and starting to push data to ga4 since old data from universal won't transfer
  // this function transforms the data to the new GA4 google analytics data structure to be recorded

  const ga4Data = {
    client_id: 'c-' + data.cid,
    user_id: 'u-' + data.uid,
    user_properties: {
      // user params
      language: {
        value: data.ul, // user language
      },
      environment: {
        value: data.cd1, // development or production
      },
      carbon_grid_version: {
        value: data.cd3, // grid version
      },
      carbon_devtools_version: {
        value: data.cd2, // extension version
      },
      experimental: {
        value: data.cd4, // boolean experimental
      },
      validate_carbon_off: {
        value: data.cd5, // boolean ignore validation
      },
      carbon_theme: {
        value: data.cd6, // theme
      },
      ibmer: {
        value: data.cd8, // is IBMer from DDO // group_id // join group event
      },
    },
    events: [
      {
        name: 'generic_event',
        params: {
          page_title: data.dt, // page title
          page_location: window.location.href, // the full URL
          page_referrer: data.dr || data.dl, // referrer full url
          screen_resolution: window.screen.width + 'x' + window.screen.height, // screen resolution
          viewport: data.vp, // viewport
          carbon_breakpoint: data.cd7, // breakpoint
        },
      },
    ],
  };

  // additional events to consider?
  // app_remove?
  // notification_dismiss?
  // notification_receive || notification_open || notification_send?

  switch (
    data.t // data.t = hit type
  ) {
    case 'event':
      // data.ec = category;
      // data.ea = action;
      // data.el = label;
      // data.ev = value;

      switch (
        data.ec // event category
      ) {
        case 'dom':
          ga4Data.events[0].name = data.ea; // using action as event name
          ga4Data.events[0].params.event_type = data.ec;
          ga4Data.events[0].params.event_label = data.el;
          ga4Data.events[0].params.event_value = data.ev;

          break;
        case 'search':
          ga4Data.events[0].name = 'search';
          ga4Data.events[0].params.search_term = data.search_term;
          ga4Data.events[0].params.event_type = data.el;
          ga4Data.events[0].params.event_value = data.ev;

          break;
        case 'navigation':
          switch (
            data.ea // event action
          ) {
            case 'click':
              ga4Data.events[0].name = 'click';
              ga4Data.events[0].params.link_url = data.link_url;
              ga4Data.events[0].params.outbound = data.outbound;

              break;
            default:
              // set custom event name to event action
              ga4Data.events[0].name = data.ea; // toggle, panel
              ga4Data.events[0].params.event_type = data.ec;
              ga4Data.events[0].params.event_label = data.el;
              ga4Data.events[0].params.event_value = data.ev;
          }

          break;
        default:
          // set custom event name to event category
          ga4Data.events[0].name = data.ec; // configuration // dom
          ga4Data.events[0].params.event_action = data.ea;
          ga4Data.events[0].params.event_label = data.el;
          ga4Data.events[0].params.event_value = data.ev;
      }

      break;
    case 'pageview':
      ga4Data.events[0].name = 'page_view';

      // additional events to push here?
      // first_visit? // when user id or client id is set for the first time
      // first_open? // first open after download, reinstall // no stored data? new app version?
      // custom: chrome updated? || app_update // version different from last stored

      // if (first_visit) {
      //   ga4Data.events.push({
      //     name: first_visit
      //   })
      // }
      // defined in setClientId(callback)?

      break;
    case 'exception':
      ga4Data.events[0].name = 'app_exception';
      ga4Data.events[0].params.fatal = data.exf;
      ga4Data.events[0].params.description = data.exd;

      break;
    case 'session':
      ga4Data.events[0].name = 'session_start';

      break;
  }

  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${ga4Id}&api_secret=${ga4API}`,
    {
      method: 'POST',
      body: JSON.stringify(ga4Data),
    }
  );
}

function setClientId(callback) {
  getStorage(['clientId'], ({ clientId }) => {
    if (!clientId) {
      // if clientId doesn't exist set it
      clientId = randomId();
      setStorage({ clientId: clientId });
    }

    if (typeof callback === 'function') {
      callback(clientId);
    }
  });
}

function getClientId(callback) {
  setClientId(callback);
}

function setIBMer(ddoValue = 0) {
  getStorage(['isIBMer'], ({ isIBMer }) => {
    // string: 'true', 'false', 'unknown'
    if (isIBMer !== 'true') {
      // don't run if we already know its an ibmer
      switch (
        ddoValue // set value from ddo object
      ) {
        case 0:
          setStorage({ isIBMer: 'false' });
          break;
        case 1:
          setStorage({ isIBMer: 'true' });
          break;
        default:
          setStorage({ isIBMer: 'unknown' });
      }
    }
  });
}

function buildGaResponse(data, tid) {
  data.tid = tid; // ga property id

  const keys = Object.keys(data);

  let key,
    value,
    response = ``;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    value = data[key];

    if (key && value) {
      response += `&${key}=${value}`;
    }
  }

  return response;
}

function gaPageview(path, title) {
  setPath = path; // Document Path
  setTitle = title; // Document Title

  sendGaResponse({ t: 'pageview' });
}

function gaEvent(category, action, label, value = null, moreData = {}) {
  // categories: shortcut,

  // category: shortcut
  // action: cmd+shift+1
  // label: gridtype
  // value: true (1), false (0)
  // ---

  const universalData = { ...moreData };
  universalData.t = 'event';
  universalData.ec = category;
  universalData.ea = action;
  universalData.el = label;
  universalData.ev = value;

  sendGaResponse(universalData);
}

function gaException(description, fatal = 0) {
  sendGaResponse({
    t: 'exception',
    exd: description,
    exf: fatal,
  });
}

function gaSession(control) {
  // page validation is true session starts
  // tab closes session ends? end of day? 30 minutes? page refresh?
  // opens?

  sendGaResponse({
    t: 'session',
    sc: control,
  });
}

function gaNavigationEvent(action, label, value, moreData) {
  // category: navigation
  // action: toggle (toggle accordion, or menu) | click (navigates away from app) | panel (aside slide over)
  // label: gridoverlay | code repository
  // value: open (1) | close (0)

  if (label === 'toggle' && value) {
    value = 1;
  } else if (label === 'toggle' && !value) {
    value = 0;
  }

  if (label === 'click') {
    value = 1;
  }

  gaEvent('navigation', action, label, value, moreData);
}

function gaSearchEvent(action, label, value, moreData) {
  // category: search
  // action: type | clear
  // label: component-list
  // value: open (1) | close (0)

  gaEvent('search', action, label, value, moreData);
}

function gaConfigurationEvent(action, label, value, moreData) {
  // ---
  // category: configuration
  // action: browser-resize-change
  // label: sm, md, lg, xlg, max
  // value: viewport width? (675)
  // ---
  // category: configuration
  // action: global-change
  // label: grid-overlay, live-specs
  // value: true / false
  // ---
  // category: configuration
  // action: grid-change
  // label: 2x-grid, mini-unit-grid
  // value: true / false
  // ---
  // category: configuration
  // action: 2x-grid
  // label: columns, borders, labels, breakpoints, gutters
  // value: true / false
  // ---
  // category: configuration
  // action: gridsettings
  // label: gridtype
  // value: v9 (9), v10 (10)????
  // ---

  if (value) {
    value = 1;
  } else {
    value = 0;
  }

  gaEvent('configuration', action, label, value, moreData);
}

function gaDomEvent(action, label, value, moreData) {
  // ---
  // category: dom
  // action: validate | inventory
  // label: ignored, carbon, noCarbon | audit
  // value: time (3000)

  gaEvent('dom', action, label, value, moreData);
}

export {
  setClientId,
  getClientId,
  setIBMer,
  gaPageview,
  gaEvent,
  gaException,
  gaSession,
  gaNavigationEvent,
  gaConfigurationEvent,
  gaDomEvent,
  gaSearchEvent,
};
