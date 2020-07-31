import { carbonPrefix } from './';
import { settings as dotcomSettings } from '@carbon/ibmdotcom-utilities';
import { getComponentNamespace as getSecurityPrefix } from '@carbon/ibm-security/es/globals/namespace';

const { stablePrefix: dotcomPrefix } = dotcomSettings;
const securityPrefix = getSecurityPrefix('');
const cloudPalPrefix = 'pal';

const prefixSelectors = [
    `[class*="${carbonPrefix}--"]`, // carbon
    `[data-autoid*="${dotcomPrefix}--"]`, // DDS
    `[class*="${securityPrefix}"]`, // security
    `[class*="${cloudPalPrefix}--"]` // pal
];

// format of components objects
//
// {
//  'COMPONENT_SELECTOR': 'COMPONENT_NAME'
// }

const carbonComponents = {};
carbonComponents[`.${carbonPrefix}--tile`] = 'Tile';

const ibmdotcomComponents = {};
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--button-group"]`] = 'ButtonGroup';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--cta-section"]`] = 'CTASection';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--callout-quote"]`] = 'CalloutQuote';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--callout-with-media"]`] = 'CalloutWithMedia';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--card"]`] = 'Card';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-cards"]`] = 'ContentBlockCards';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-media"]`] = 'ContentBlockMedia';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-mixedgroups"]`] = 'ContentBlockMixed';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-segmented"]`] = 'ContentBlockSegmented';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-simple"]`] = 'ContentBlockSimple';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group-cards"]`] = 'ContentGroupCards';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group-horizontal"]`] = 'ContentGroupHorizontal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group-pictograms"]`] = 'ContentGroupPictograms';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group-simple"]`] = 'ContentGroupSimple';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-item-horizontal__item"]`] = 'ContentItemHorizontal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--dotcom-shell"]`] = 'DotcomShell';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--feature-card"]`] = 'FeatureCard';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--feature-card-block-large"]`] = 'FeatureCardBlockLarge';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--feature-card-block-medium"]`] = 'FeatureCardBlockMedium';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--footer"]`] = 'Footer';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--hr"]`] = 'HorizontalRule';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--image-with-caption"]`] = 'ImageWithCaption';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--layout"]`] = 'Layout';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--leadspace"]`] = 'Leadspace';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--leadspace-block"]`] = 'LeadspaceBlock';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--lightbox-media-viewer"]`] = 'LightBoxMediaViewer';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--link-list"]`] = 'LinkList';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--link-with-icon"]`] = 'LinkWithIcon';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--locale-modal"]`] = 'LocaleModal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--expressive-modal"]`] = 'ExpressiveModal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--logo-grid"]`] = 'LogoGrid';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--masthead"]`] = 'Masthead';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--masthead__l1"]`] = 'MastheadL1';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--quote"]`] = 'Quote';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--tableofcontents"]`] = 'TableOfContents';
ibmdotcomComponents[`.${carbonPrefix}--video-player`] = 'VideoPlayer';
ibmdotcomComponents[`.${carbonPrefix}--card-section`] = 'CardSection';
ibmdotcomComponents[`.${carbonPrefix}--pictogram-item`] = 'PictogramItem';
ibmdotcomComponents[`.${carbonPrefix}--image`] = 'Image';
ibmdotcomComponents[`.${carbonPrefix}--card-group`] = 'CardGroup';
// internal
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block"]`] = 'ContentBlock';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group"]`] = 'ContentGroup';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-item"]`] = 'ContentItem';
ibmdotcomComponents[`.${carbonPrefix}--content-section`] = 'ContentSection';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--callout__container"]`] = 'Callout';
// experimental

const securityComponents = {};
securityComponents[`.${securityPrefix}delimited-list`] = 'DelimitedList';

const allComponents = {
    ...carbonComponents,
    ...ibmdotcomComponents,
    ...securityComponents
};

console.log(allComponents);

export {
    prefixSelectors,
    carbonComponents,
    ibmdotcomComponents,
    securityComponents,
    allComponents
};