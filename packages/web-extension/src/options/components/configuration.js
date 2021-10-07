import { setStorage } from '@carbon/devtools-utilities/src/setStorage';
import { gaConfigurationEvent } from '@carbon/devtools-utilities/src/ga';

function configuration(label, data) {
  if (data) {
    setStorage(data);
  }

  gaConfigurationEvent('general-settings-change', label);
}

export { configuration };
