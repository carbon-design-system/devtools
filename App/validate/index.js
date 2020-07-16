import { sendMessage } from '../utilities';
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

    // at least components on page
    if (document.querySelector(`${carbonSelector}, ${ddsSelector}`)) {
        msg.runningCarbon = true;
    }

    console.log(msg);
    sendMessage(msg); // TODO: SET STORAGE INSTEAD?
}
