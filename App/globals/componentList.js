import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { settings as carbonSettings } from 'carbon-components';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const { prefix: carbonPrefix } = carbonSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal';

const prefixSelectors = [
    `[class*="${carbonPrefix}--"]`, // carbon
    `[data-autoid*="${dotcomPrefix}--"]`, // DDS
    `[class*="${securityPrefix}"]`, // security
    `[class*="${cloudPalPrefix}--"]` // pal
];

const carbonComponents = [];

const ibmdotcomComponents = [];

const securityComponents = [];

const allComponents = [];

export {
    prefixSelectors
};