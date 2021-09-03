import { settings } from 'carbon-components';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { getComponentNamespace } from '@carbon/ibm-security/es/globals/namespace';

const carbonPrefix = settings.prefix;
const getSecurityPrefix = getComponentNamespace;
const { stablePrefix: ddsPrefix } = ddsSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal'; // static hardcoded

const prefixSelectors =
  `[class*="${carbonPrefix}--"], ` + // carbon
  `[data-autoid*="${ddsPrefix}--"], [data-auto-id*="${ddsPrefix}--"], ` + // DDS
  `[class*="${securityPrefix}"], ` + // security
  `[class*="${cloudPalPrefix}--"]`; // pal

export default {
  prefixSelectors,
  carbonPrefix,
  ddsPrefix,
  securityPrefix,
  cloudPalPrefix,
  getSecurityPrefix,
};
