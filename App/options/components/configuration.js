import { setStorage, gaConfigurationEvent } from '../../utilities';

function configuration (label, data) {
    if (data) {
        setStorage(data);
    }

    gaConfigurationEvent('general-settings-change', label);
}

export { configuration };