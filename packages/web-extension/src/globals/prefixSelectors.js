import { pkg } from '@carbon/ibm-cloud-cognitive';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';
import { settings as carbonSettings } from 'carbon-components';

const {
  devtoolsAttribute: cloudCognitiveDevtoolsAttribute,
  getDevtoolsId: getCloudCognitiveDevtoolsId,
} = pkg;

/*
  note on carbonPrefix
  in setPrefix.js we set the prefix to carbonPrefix. This gets run on the first pass so the grid gets a prefix unique to devtools. This gets overwritten on the second pass which is why we go back to prefix if it's undefined. Maybe there is a solution for this in the future, but adding this note here so we don't forget for now why it's like this...
*/

const carbonPrefix = carbonSettings.carbonPrefix || carbonSettings.prefix;
const { stablePrefix: dotcomPrefix } = dotcomSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal'; // static hardcoded
const cloudCognitiveDevtoolsId = getCloudCognitiveDevtoolsId('');

const prefixSelectors = [
  `class*="${carbonPrefix}--"`, // Carbon
  `${cloudCognitiveDevtoolsAttribute}*="${cloudCognitiveDevtoolsId}"`, // Cloud & Cognitive — https://github.com/carbon-design-system/ibm-cloud-cognitive
  `data-autoid*="${dotcomPrefix}--"`, // IBM.com
  `data-auto-id*="${dotcomPrefix}--"`, // IBM.com
  `class*="${securityPrefix}"`, // Security
  `class*="${cloudPalPrefix}--"`, // Cloud PAL
].reduce(
  (prefixSelectors, prefixSelector, index) =>
    `${index > 0 ? `${prefixSelectors}, ` : ''}[${prefixSelector}]`,
  ''
);

export {
  prefixSelectors,
  carbonPrefix,
  dotcomPrefix,
  securityPrefix,
  cloudPalPrefix,
  getSecurityPrefix,
  cloudCognitiveDevtoolsId,
};
