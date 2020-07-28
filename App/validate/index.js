import { sendMessage, getStorage } from '../utilities';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { settings as carbonSettings } from 'carbon-components';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const { prefix: carbonPrefix } = carbonSettings;

sendValidation();

function sendValidation () {
    const ddsSelector = `[data-autoid*="${dotcomPrefix}--"]`;
    const carbonSelector = `[class*="${carbonPrefix}--"]`;
    const carbonComponents = document.querySelector(`${carbonSelector}, ${ddsSelector}`);
    
    // console.log(carbonComponents.querySelectorAll('a'));

    const msg = {
        runningCarbon: false,
        ignoreValidation: false,
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
