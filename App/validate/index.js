import { sendMessage, getStorage } from '../utilities';
import { prefixSelectors } from '../globals';

sendValidation();

function sendValidation () {
    const carbonComponents = document.querySelector(prefixSelectors);

    const msg = {
        runningCarbon: false,
        ignoreValidation: false,
        windowWidth: window.outerWidth
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

        sendMessage(msg); // TODO: SET STORAGE INSTEAD?
    });
}
