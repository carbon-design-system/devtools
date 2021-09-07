import { pkg } from '@carbon/ibm-cloud-cognitive';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';

import { carbonPrefix } from '.';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal'; // static hardcoded

const {
  devtoolsAttribute: cloudCognitiveDevtoolsAttribute,
  getDevtoolsId: getCloudCognitiveDevtoolsId,
} = pkg;

const prefixSelectors = [
  `class*="${carbonPrefix}--"`, // Carbon
  `${cloudCognitiveDevtoolsAttribute}*="${getCloudCognitiveDevtoolsId('')}"`, // Cloud & Cognitive — https://github.com/carbon-design-system/ibm-cloud-cognitive
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
};
