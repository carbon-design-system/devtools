import { setStorage, gaConfigurationEvent } from '@carbon/devtools-utilities';

function configuration (label, data) {
    if (data) {
        setStorage(data);
    }

    gaConfigurationEvent('general-settings-change', label);
}

export { configuration };