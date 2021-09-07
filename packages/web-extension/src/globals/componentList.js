import * as CloudCognitive from '@carbon/ibm-cloud-cognitive';

import {
  carbonPrefix,
  dotcomPrefix,
  cloudPalPrefix,
  getSecurityPrefix,
} from './prefixSelectors';

// format of components objects
//
// {
//  'COMPONENT_SELECTOR': 'COMPONENT_NAME'
// }

const carbonComponents = {};
carbonComponents[`.${carbonPrefix}--accordion`] = 'Accordion';
carbonComponents[`.${carbonPrefix}--accordion__item`] = 'AccordionItem';
carbonComponents[`.${carbonPrefix}--breadcrumb`] = 'Breadcrumb';
carbonComponents[`.${carbonPrefix}--breadcrumb-item`] = 'BreadcrumbItem';
carbonComponents[`.${carbonPrefix}--btn`] = 'Button';
carbonComponents[`.${carbonPrefix}--checkbox`] = 'Checkbox';
carbonComponents[`.${carbonPrefix}--snippet`] = 'CodeSnippet';
carbonComponents[`.${carbonPrefix}--content-switcher`] = 'ContentSwitcher';
carbonComponents[`.${carbonPrefix}--content-switcher-btn`] =
  'ContentSwitcherButton';
carbonComponents[`.${carbonPrefix}--data-table-header`] = 'DataTableHeader';
carbonComponents[`.${carbonPrefix}--data-table`] = 'DataTable';
carbonComponents[`.${carbonPrefix}--data-table tbody > tr`] = 'DataTableRow';
carbonComponents[`.${carbonPrefix}--date-picker`] = 'DatePicker';
carbonComponents[`.${carbonPrefix}--dropdown`] = 'Dropdown';
carbonComponents[`.${carbonPrefix}--file__container`] = 'FileUploader';
carbonComponents[`.${carbonPrefix}--label`] = 'Label';
carbonComponents[`.${carbonPrefix}--form-item`] = 'FormItem';
carbonComponents[`.${carbonPrefix}--fieldset`] = 'Fieldset';
carbonComponents[`.${carbonPrefix}--form`] = 'Form';
carbonComponents[`.${carbonPrefix}--inline-loading`] = 'InlineLoading';
carbonComponents[`.${carbonPrefix}--link`] = 'Link';
carbonComponents[
  `.${carbonPrefix}--list--unordered, .${carbonPrefix}--list--ordered`
] = 'List';
carbonComponents[`.${carbonPrefix}--list__item`] = 'ListItem';
carbonComponents[`.${carbonPrefix}--loading`] = 'Loading';
carbonComponents[`.${carbonPrefix}--modal`] = 'Modal';
carbonComponents[`.${carbonPrefix}--toast-notification`] = 'Notification';
carbonComponents[`.${carbonPrefix}--number`] = 'NumberInput';
carbonComponents[`.${carbonPrefix}--overflow-menu`] = 'OverflowMenu';
carbonComponents[`.${carbonPrefix}--pagination`] = 'Pagination';
carbonComponents[`.${carbonPrefix}--progress`] = 'ProgressIndicator';
carbonComponents[`.${carbonPrefix}--progress-step`] = 'ProgressStep';
carbonComponents[`.${carbonPrefix}--radio-button`] = 'RadioButton';
carbonComponents[`.${carbonPrefix}--search`] = 'Search';
carbonComponents[`.${carbonPrefix}--select`] = 'Select';
carbonComponents[`.${carbonPrefix}--slider`] = 'Slider';
carbonComponents[`.${carbonPrefix}--structured-list`] = 'StructuredList';
carbonComponents[`.${carbonPrefix}--structured-list-row`] = 'StructuredListRow';
carbonComponents[`.${carbonPrefix}--tabs`] = 'Tabs';
carbonComponents[`.${carbonPrefix}--tabs__nav-item`] = 'Tab';
carbonComponents[`.${carbonPrefix}--tag`] = 'Tag';
carbonComponents[`.${carbonPrefix}--text-input`] = 'TextInput';
carbonComponents[`.${carbonPrefix}--tile`] = 'Tile';
carbonComponents[`.${carbonPrefix}--toggle-input`] = 'Toggle';
carbonComponents[`.${carbonPrefix}--tooltip__trigger`] = 'Tooltip';
carbonComponents[`.${carbonPrefix}--header`] = 'UIShellHeader';
carbonComponents[`.${carbonPrefix}--side-nav`] = 'UIShellLeftPanel';
carbonComponents[`.${carbonPrefix}--header-panel`] = 'UIShellRightPanel';
carbonComponents[`.${carbonPrefix}--copy-btn`] = 'CopyButton';
carbonComponents[`.${carbonPrefix}--skeleton`] = 'Skeleton';
carbonComponents[`.${carbonPrefix}--text-area`] = 'TextArea';
carbonComponents[`.${carbonPrefix}--time-picker`] = 'TimePicker';

let {
  pkg: {
    devtoolsAttribute: cloudCognitiveDevtoolsAttribute,
    getDevtoolsId: getCloudCognitiveDevtoolsId,
  },
  ...cloudCognitiveComponents
} = CloudCognitive;

cloudCognitiveComponents = Object.values(cloudCognitiveComponents).reduce(
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

const ibmdotcomComponents = {};
// internal
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block"]`] =
  'ContentBlock';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group"]`] =
  'ContentGroup';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-item"]`] =
  'ContentItem';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--callout__container"]`] =
  'Callout';
ibmdotcomComponents[`.${carbonPrefix}--content-section`] = 'ContentSection';
// experimental
//
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--button-group"]`] =
  'ButtonGroup';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--cta-section"]`] =
  'CTASection';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--callout-quote"]`] =
  'CalloutQuote';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--callout-with-media"]`] =
  'CalloutWithMedia';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--card"]`] = 'Card';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-cards"]`] =
  'ContentBlockCards';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-media"]`] =
  'ContentBlockMedia';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--content-block-mixedgroups"]`
] = 'ContentBlockMixed';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--content-block-segmented"]`
] = 'ContentBlockSegmented';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-block-simple"]`] =
  'ContentBlockSimple';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group-cards"]`] =
  'ContentGroupCards';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--content-group-horizontal"]`
] = 'ContentGroupHorizontal';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--content-group-pictograms"]`
] = 'ContentGroupPictograms';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--content-group-simple"]`] =
  'ContentGroupSimple';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--content-item-horizontal__item"]`
] = 'ContentItemHorizontal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--dotcom-shell"]`] =
  'DotcomShell';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--feature-card"]`] =
  'FeatureCard';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--feature-card-block-large"]`
] = 'FeatureCardBlockLarge';
ibmdotcomComponents[
  `[data-autoid="${dotcomPrefix}--feature-card-block-medium"]`
] = 'FeatureCardBlockMedium';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--footer"]`] = 'Footer';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--hr"]`] = 'HorizontalRule';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--image-with-caption"]`] =
  'ImageWithCaption';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--layout"]`] = 'Layout';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--leadspace"]`] = 'Leadspace';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--leadspace-block"]`] =
  'LeadspaceBlock';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--lightbox-media-viewer"]`] =
  'LightBoxMediaViewer';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--link-list"]`] = 'LinkList';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--link-with-icon"]`] =
  'LinkWithIcon';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--locale-modal"]`] =
  'LocaleModal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--expressive-modal"]`] =
  'ExpressiveModal';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--logo-grid"]`] = 'LogoGrid';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--masthead"]`] = 'Masthead';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--masthead__l1"]`] =
  'MastheadL1';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--quote"]`] = 'Quote';
ibmdotcomComponents[`[data-autoid="${dotcomPrefix}--tableofcontents"]`] =
  'TableOfContents';
ibmdotcomComponents[`.${carbonPrefix}--video-player`] = 'VideoPlayer';
ibmdotcomComponents[`.${carbonPrefix}--card-section`] = 'CardSection';
ibmdotcomComponents[`.${carbonPrefix}--pictogram-item`] = 'PictogramItem';
ibmdotcomComponents[`.${carbonPrefix}--image`] = 'Image';
ibmdotcomComponents[`.${carbonPrefix}--card-group`] = 'CardGroup';

const securityComponents = {};
securityComponents[`.${getSecurityPrefix('combo-button')}`] = 'ComboButton';
securityComponents[`.${getSecurityPrefix('decorator')}`] = 'Decorator';
securityComponents[`.${getSecurityPrefix('error-page')}`] = 'ErrorPage';
securityComponents[`.${getSecurityPrefix('filter-panel')}`] = 'FilterPanel';
securityComponents[`.${getSecurityPrefix('header')}`] = 'Header';
securityComponents[`.${getSecurityPrefix('icon-button-bar')}`] =
  'IconButtonBar';
securityComponents[`.${getSecurityPrefix('ne-section')}`] =
  'NonEntitledSection';
securityComponents[`.${getSecurityPrefix('search-bar')}`] = 'SearchBar';
securityComponents[`.${getSecurityPrefix('shell')}`] = 'Shell';
securityComponents[`.${getSecurityPrefix('status-indicator')}`] =
  'StatusIndicator';
securityComponents[`.${getSecurityPrefix('summary-card')}`] = 'SummaryCard';
securityComponents[`.${getSecurityPrefix('tag-wall')}`] = 'TagWall';
securityComponents[`.${getSecurityPrefix('tag-wall-filter')}`] =
  'TagWallFilter';
securityComponents[`.${getSecurityPrefix('tearsheet')}`] = 'Tearsheet';
securityComponents[`.${getSecurityPrefix('tearsheet--small')}`] =
  'TearsheetSmall';
securityComponents[`.${getSecurityPrefix('toolbar')}`] = 'Toolbar';
securityComponents[`.${getSecurityPrefix('button')}`] = 'Button';
securityComponents[`.${getSecurityPrefix('data-table')}`] = 'DataTable';
securityComponents[`.${getSecurityPrefix('data-table-pagination')}`] =
  'DataTablePagination';
securityComponents[`.${getSecurityPrefix('delimited-list')}`] = 'DelimitedList';
securityComponents[`.${getSecurityPrefix('link--external')}`] = 'ExternalLink';
securityComponents[`.${getSecurityPrefix('ica')}`] = 'ICA';
securityComponents[`.${getSecurityPrefix('button--icon')}`] = 'ButtonIcon';
securityComponents[`.${getSecurityPrefix('nav')}`] = 'Nav';
securityComponents[`.${getSecurityPrefix('pill')}`] = 'Pill';
securityComponents[`.${getSecurityPrefix('profile-image')}`] = 'ProfileImage';
securityComponents[`.${getSecurityPrefix('scroll-gradient')}`] =
  'ScrollGradient';
securityComponents[`.${getSecurityPrefix('stacked-notification')}`] =
  'StackedNotification';
securityComponents[`.${getSecurityPrefix('status-icon')}`] = 'StatusIcon';
securityComponents[`.${getSecurityPrefix('string-formatter')}`] =
  'StringFormatter';
securityComponents[`.${getSecurityPrefix('truncated-list')}`] = 'TruncatedList';
securityComponents[`.${getSecurityPrefix('type-layout__container')}`] =
  'TypeLayout';
securityComponents[`.${getSecurityPrefix('time-indicator')}`] = 'TimeIndicator';
securityComponents[`.${getSecurityPrefix('trending-card')}`] = 'TrendingCard';

const cloudPalComponents = {};
securityComponents[`.${cloudPalPrefix}--card`] = 'Card';
securityComponents[`.${cloudPalPrefix}--catalog-tile`] = 'CatalogTile';
securityComponents[`.${cloudPalPrefix}--create-resource-group`] =
  'CreateResourceGroup';
securityComponents[`.${cloudPalPrefix}--data-table`] = 'DataTable';
securityComponents[`.${cloudPalPrefix}--side-nav`] = 'SideNav';
securityComponents[`.${cloudPalPrefix}--media-gallery`] = 'MediaGallery';
securityComponents[`.${cloudPalPrefix}--message`] = 'Message';
securityComponents[`.${cloudPalPrefix}--observe-button__flex-responsive`] =
  'ObserveButton';
securityComponents[`.${cloudPalPrefix}--order-summary`] = 'OrderSummary';
securityComponents[`.${cloudPalPrefix}--order-summary-v2`] = 'OrderSummaryV2';
securityComponents[`.${cloudPalPrefix}--page-header`] = 'PageHeader';
securityComponents[`.${cloudPalPrefix}--progress-bar`] = 'ProgressBar';
securityComponents[`.${cloudPalPrefix}--resource-tag-area`] = 'ResourceTag';
securityComponents[`.${cloudPalPrefix}--service-usage-breakdown__container`] =
  'ServiceUsageBreakdown';
securityComponents[`.${cloudPalPrefix}--status`] = 'Status';
securityComponents[`.${cloudPalPrefix}--submit-promo__container`] =
  'SubmitPromo';
securityComponents[`.${cloudPalPrefix}--tag-list`] = 'TagList';
securityComponents[`.${cloudPalPrefix}--grid-layout`] = 'GridLayout';
securityComponents[`.${cloudPalPrefix}--left-panel-layout`] = 'LeftPanelLayout';
securityComponents[`.${cloudPalPrefix}--titled-section-layout`] =
  'TitledSectionLayout';
securityComponents[`.${cloudPalPrefix}--card-layout`] = 'CardLayout';
securityComponents[`.${cloudPalPrefix}--provision-about-page`] =
  'ProvisionAboutPage';
securityComponents[`.${cloudPalPrefix}--tables-layout`] = 'Tables';

const allComponents = {
  ...carbonComponents,
  ...cloudCognitiveComponents,
  ...ibmdotcomComponents,
  ...securityComponents,
  ...cloudPalComponents,
};

export {
  allComponents,
  carbonComponents,
  ibmdotcomComponents,
  securityComponents,
  cloudPalComponents,
};
