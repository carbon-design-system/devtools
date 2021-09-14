import * as _CloudCognitive from '@carbon/ibm-cloud-cognitive';

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

    return components;
  },
  {}
);

export { cloudCognitive };
