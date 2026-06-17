import * as _CloudCognitiveV11 from '@carbon/ibm-products-v2';
import { _initStats } from '../helpers.js';

const { _stats, success } = new _initStats();

let {
  pkg: {
    devtoolsAttribute: cloudCognitiveDevtoolsAttributeV11,
    getDevtoolsId: getCloudCognitiveDevtoolsIdV11,
  },
  ...cloudCognitiveV11
} = _CloudCognitiveV11;

cloudCognitiveV11 = Object.values(cloudCognitiveV11).reduce(
  (components, { displayName }) => {
    components[
      `[${cloudCognitiveDevtoolsAttributeV11}="${getCloudCognitiveDevtoolsIdV11(
        displayName
      )}"]`
    ] = displayName;

    success();

    return components;
  },
  {}
);

cloudCognitiveV11 = {
  name: 'Carbon for IBM Products',
  version: 'v11',
  components: cloudCognitiveV11,
  _stats,
};

export { cloudCognitiveV11 };
