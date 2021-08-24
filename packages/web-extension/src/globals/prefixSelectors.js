import { pkg as _cloudCognitivePkg } from '@carbon/ibm-cloud-cognitive';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';

import { carbonPrefix } from '.';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal'; // static hardcoded

const prefixSelectors =
  `[class*="${carbonPrefix}--"], ` + // carbon
  `[data-carbon-devtools-id]` + // `[${cloudCognitivePkg.devtoolsAttribute}]` + // `Carbon for Cloud & Cognitive — https://github.com/carbon-design-system/ibm-cloud-cognitive
  `[data-autoid*="${dotcomPrefix}--"], [data-auto-id*="${dotcomPrefix}--"], ` + // DDS
  `[class*="${securityPrefix}"], ` + // security
  `[class*="${cloudPalPrefix}--"]`; // pal

export {
  prefixSelectors,
  carbonPrefix,
  dotcomPrefix,
  securityPrefix,
  cloudPalPrefix,
  getSecurityPrefix,
};
