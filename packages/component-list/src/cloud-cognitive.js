import * as _CloudCognitive from '@carbon/ibm-cloud-cognitive'; // adds 6.48 mb to file size

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
