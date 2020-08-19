import { setStorage, getStorage, activeTab, randomId } from './';
import { version } from '../../package.json';

const gaId = 'UA-28030649-4';

function sendGaResponse (data) {
    activeTab(tab => {
        getStorage(
            ['clientId', 'gridVersion', 'generalTheme', 'generalExperimental', 'generalNonCarbon'],
            ({ clientId,  gridVersion, generalTheme, generalExperimental, generalNonCarbon }) => {

            // building default responses
            data.v = 1; // version number
            data.tid = gaId; // ga property id
            data.cid = clientId || 5555; // client id
            data.uid = clientId || 5555; // client id
            data.ul = window.navigator.language.toLowerCase(); // user language
            data.cd1 = process.env.NODE_ENV; // development or production
            data.cd2 = version; // extension version
            data.cd3 = gridVersion; // grid version
            data.cd4 = generalExperimental; // experimental
            data.cd5 = generalNonCarbon; // ignore validation
            data.cd6 = generalTheme; // theme
            
            if (tab) {
                if (tab.width && tab.height) {
                    data.vp = `${tab.width}x${tab.height}`; // viewport
                }
                
                if (tab.url) {
                    data.dr = tab.url; // tab url
                }
            }

            fetch('https://www.google-analytics.com/collect', {
                method: 'POST',
                body: buildGaResponse(data),
            });
        });
    });
}

function setClientId (callback) {
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

function getClientId (callback) {
    setClientId(callback);
}

function buildGaResponse (data) {
    const keys = Object.keys(data);
    let key, value,
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

function gaPageview (path, title) {
    sendGaResponse({
        t: 'pageview',
        dp: path,
        dt: title
    });
}

function gaEvent (category, action, label, value, moreData = {}) {
    // categories: shortcut,
    
    // category: shortcut
    // action: cmd+shift+1
    // label: gridtype
    // value: true (1), false (0)
    // ---
    
    const data = value === -1 ? moreData : {};
          data.t = 'event';
          data.ec = category;
          data.ea = action;
          data.el = label;
    
    if (value => 0) {
        data.ev = value;
    }

    sendGaResponse(data);
}

function gaException (description, fatal = 0) {
    sendGaResponse({
        t: 'exception',
        exd: description,
        exf: fatal
    });
}

function gaSession (control) {
    // page validation is true session starts
    // tab closes session ends? end of day? 30 minutes? page refresh?
    // opens?

    sendGaResponse({
        t: 'session',
        sc: control
    });
}

function gaNavigationEvent (action, label, value, moreData) {
    // category: navigation
    // action: toggle | click
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


function gaConfigurationEvent (action, label, value, moreData) {

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

function gaDomEvent (action, label, value, moreData) {
    
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
    gaPageview,
    gaEvent,
    gaException,
    gaSession,
    gaNavigationEvent,
    gaConfigurationEvent,
    gaDomEvent
};