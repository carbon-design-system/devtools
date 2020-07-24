import { sendMessage, getStorage } from '../utilities';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { settings as carbonSettings } from 'carbon-components';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const { prefix: carbonPrefix } = carbonSettings;

sendValidation();

function sendValidation () {
    const ddsSelector = `[data-autoid*="${dotcomPrefix}--"]`;
    const carbonSelector = `[class*="${carbonPrefix}--"]`;

    const msg = {
        runningCarbon: false
    };

    getStorage(['generalNonCarbon'], ({generalNonCarbon}) => {
        // at least components on page
        // or user chooses to ignore carbon validation
        if (generalNonCarbon || document.querySelector(`${carbonSelector}, ${ddsSelector}`)) {
            msg.runningCarbon = true;
        }

        sendMessage(msg); // TODO: SET STORAGE INSTEAD?
    });
}
