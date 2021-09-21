import * as _CloudCognitive from '@carbon/ibm-cloud-cognitive';
import { _initStats } from '../helpers.js';

const { _stats, success } = new _initStats();

let {
  pkg: {
    devtoolsAttribute: cloudCognitiveDevtoolsAttribute,
    getDevtoolsId: getCloudCognitiveDevtoolsId,
  },
  ...cloudCognitive
} = _CloudCognitive;

cloudCognitive = Object.values(cloudCognitive).reduce(
  (components, { displayName }) => {
    components[
      `[${cloudCognitiveDevtoolsAttribute}="${getCloudCognitiveDevtoolsId(
        displayName
      )}"]`
    ] = displayName;

    success();

    return components;
  },
  {}
);

cloudCognitive = { ...cloudCognitive, _stats }

export { cloudCognitive };
