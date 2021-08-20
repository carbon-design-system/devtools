import { pkg } from '@carbon/ibm-cloud-cognitive';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';

import { carbonPrefix } from '.';

const cloudCognitivePrefix = pkg.prefix;
const { stablePrefix: dotcomPrefix } = dotcomSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal'; // static hardcoded

const prefixSelectors =
  `[class*="${carbonPrefix}--"], ` + // carbon
  `[data-carbon-devtools-id]` + // `[${pkg.devtoolsAttribute}]` + // `Carbon for Cloud & Cognitive — https://github.com/carbon-design-system/ibm-cloud-cognitive
  `[class*="${cloudCognitivePrefix}--"]` + // TODO: Remove.
  `[data-autoid*="${dotcomPrefix}--"], [data-auto-id*="${dotcomPrefix}--"], ` + // DDS
  `[class*="${securityPrefix}"], ` + // security
  `[class*="${cloudPalPrefix}--"]`; // pal

export {
  prefixSelectors,
  carbonPrefix,
  cloudCognitivePrefix,
  dotcomPrefix,
  securityPrefix,
  cloudPalPrefix,
  getSecurityPrefix,
};
