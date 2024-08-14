import { setStorage } from '@carbon/devtools-utilities/src/setStorage';

function configuration(_label, data) {
  if (data) {
    setStorage(data);
  }
}

export { configuration };
