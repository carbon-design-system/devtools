import { setStorage } from '@carbon/devtools-utilities/src/setStorage';

function configuration(label, data) {
  if (data) {
    setStorage(data);
  }
}

export { configuration };
