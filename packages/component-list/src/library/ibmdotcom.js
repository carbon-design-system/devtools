import {
  dotcomPrefix,
  carbonPrefix,
} from '../../../web-extension/src/globals/prefixSelectors.js';

const ibmdotcom = {};
// internal
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-block"]`] = 'ContentBlock';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-group"]`] = 'ContentGroup';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-item"]`] = 'ContentItem';
ibmdotcom[`[data-autoid="${dotcomPrefix}--callout__container"]`] = 'Callout';
ibmdotcom[`.${carbonPrefix}--content-section`] = 'ContentSection';
// experimental
//
ibmdotcom[`[data-autoid="${dotcomPrefix}--button-group"]`] = 'ButtonGroup';
ibmdotcom[`[data-autoid="${dotcomPrefix}--cta-section"]`] = 'CTASection';
ibmdotcom[`[data-autoid="${dotcomPrefix}--callout-quote"]`] = 'CalloutQuote';
ibmdotcom[`[data-autoid="${dotcomPrefix}--callout-with-media"]`] =
  'CalloutWithMedia';
ibmdotcom[`[data-autoid="${dotcomPrefix}--card"]`] = 'Card';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-block-cards"]`] =
  'ContentBlockCards';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-block-media"]`] =
  'ContentBlockMedia';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-block-mixedgroups"]`] =
  'ContentBlockMixed';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-block-segmented"]`] =
  'ContentBlockSegmented';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-block-simple"]`] =
  'ContentBlockSimple';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-group-cards"]`] =
  'ContentGroupCards';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-group-horizontal"]`] =
  'ContentGroupHorizontal';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-group-pictograms"]`] =
  'ContentGroupPictograms';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-group-simple"]`] =
  'ContentGroupSimple';
ibmdotcom[`[data-autoid="${dotcomPrefix}--content-item-horizontal__item"]`] =
  'ContentItemHorizontal';
ibmdotcom[`[data-autoid="${dotcomPrefix}--dotcom-shell"]`] = 'DotcomShell';
ibmdotcom[`[data-autoid="${dotcomPrefix}--feature-card"]`] = 'FeatureCard';
ibmdotcom[`[data-autoid="${dotcomPrefix}--feature-card-block-large"]`] =
  'FeatureCardBlockLarge';
ibmdotcom[`[data-autoid="${dotcomPrefix}--feature-card-block-medium"]`] =
  'FeatureCardBlockMedium';
ibmdotcom[`[data-autoid="${dotcomPrefix}--footer"]`] = 'Footer';
ibmdotcom[`[data-autoid="${dotcomPrefix}--hr"]`] = 'HorizontalRule';
ibmdotcom[`[data-autoid="${dotcomPrefix}--image-with-caption"]`] =
  'ImageWithCaption';
ibmdotcom[`[data-autoid="${dotcomPrefix}--layout"]`] = 'Layout';
ibmdotcom[`[data-autoid="${dotcomPrefix}--leadspace"]`] = 'Leadspace';
ibmdotcom[`[data-autoid="${dotcomPrefix}--leadspace-block"]`] =
  'LeadspaceBlock';
ibmdotcom[`[data-autoid="${dotcomPrefix}--lightbox-media-viewer"]`] =
  'LightBoxMediaViewer';
ibmdotcom[`[data-autoid="${dotcomPrefix}--link-list"]`] = 'LinkList';
ibmdotcom[`[data-autoid="${dotcomPrefix}--link-with-icon"]`] = 'LinkWithIcon';
ibmdotcom[`[data-autoid="${dotcomPrefix}--locale-modal"]`] = 'LocaleModal';
ibmdotcom[`[data-autoid="${dotcomPrefix}--expressive-modal"]`] =
  'ExpressiveModal';
ibmdotcom[`[data-autoid="${dotcomPrefix}--logo-grid"]`] = 'LogoGrid';
ibmdotcom[`[data-autoid="${dotcomPrefix}--masthead"]`] = 'Masthead';
ibmdotcom[`[data-autoid="${dotcomPrefix}--masthead__l1"]`] = 'MastheadL1';
ibmdotcom[`[data-autoid="${dotcomPrefix}--quote"]`] = 'Quote';
ibmdotcom[`[data-autoid="${dotcomPrefix}--tableofcontents"]`] =
  'TableOfContents';
ibmdotcom[`.${carbonPrefix}--video-player`] = 'VideoPlayer';
ibmdotcom[`.${carbonPrefix}--card-section`] = 'CardSection';
ibmdotcom[`.${carbonPrefix}--pictogram-item`] = 'PictogramItem';
ibmdotcom[`.${carbonPrefix}--image`] = 'Image';
ibmdotcom[`.${carbonPrefix}--card-group`] = 'CardGroup';

export { ibmdotcom };
