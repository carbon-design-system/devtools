import { carbonPrefix } from './';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal'; // static hardcoded

const prefixSelectors =
  `[class*="${carbonPrefix}--"], ` + // carbon
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
