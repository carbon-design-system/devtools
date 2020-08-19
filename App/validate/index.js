import { sendMessage, getStorage } from '../utilities';
import { prefixSelectors } from '../globals';

sendValidation();

function sendValidation () {
    const carbonComponents = document.querySelector(prefixSelectors);

    const msg = {
        runningCarbon: false,
        ignoreValidation: false,
        windowWidth: window.outerWidth,
        carbonDevtoolsInjected: window.carbonDevtoolsInjected || false
        // carbonComponents: {
        //     '.bx--link': document.querySelectorAll(`.bx--link`).length,
        //     '.bx--button': document.querySelectorAll(`.bx--button`).length,
        //     '.bx--tile': document.querySelectorAll(`.bx--tile`).length
        // }
    };

    getStorage(['generalNonCarbon'], ({generalNonCarbon}) => {
        // at least components on page
        // or user chooses to ignore carbon validation
        if (generalNonCarbon || carbonComponents) {
            msg.runningCarbon = true;
            msg.ignoreValidation = generalNonCarbon;
        }

        
        // inject css via this method for development purposes
        if (process.env.NODE_ENV === 'development'
         && !msg.carbonDevtoolsInjected) {
            if (msg.ignoreValidation || msg.runningCarbon) {
                const cssURL = chrome.extension.getURL('/static/inject/index.css');
                
                if (!document.querySelector(`[href="${cssURL}"]`)) {
                    injectStyles(cssURL);
                }
            }
        }

        sendMessage(msg); // TODO: SET STORAGE INSTEAD?
    });
}

function injectStyles(url) {
    var elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.setAttribute('href', url);
    document.head.appendChild(elem);
}