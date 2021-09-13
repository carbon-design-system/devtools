import { getSecurityPrefix } from '../../web-extension/src/globals/prefixSelectors.js';

const security = {};
security[`.${getSecurityPrefix('combo-button')}`] = 'ComboButton';
security[`.${getSecurityPrefix('decorator')}`] = 'Decorator';
security[`.${getSecurityPrefix('error-page')}`] = 'ErrorPage';
security[`.${getSecurityPrefix('filter-panel')}`] = 'FilterPanel';
security[`.${getSecurityPrefix('header')}`] = 'Header';
security[`.${getSecurityPrefix('icon-button-bar')}`] = 'IconButtonBar';
security[`.${getSecurityPrefix('ne-section')}`] = 'NonEntitledSection';
security[`.${getSecurityPrefix('search-bar')}`] = 'SearchBar';
security[`.${getSecurityPrefix('shell')}`] = 'Shell';
security[`.${getSecurityPrefix('status-indicator')}`] = 'StatusIndicator';
security[`.${getSecurityPrefix('summary-card')}`] = 'SummaryCard';
security[`.${getSecurityPrefix('tag-wall')}`] = 'TagWall';
security[`.${getSecurityPrefix('tag-wall-filter')}`] = 'TagWallFilter';
security[`.${getSecurityPrefix('tearsheet')}`] = 'Tearsheet';
security[`.${getSecurityPrefix('tearsheet--small')}`] = 'TearsheetSmall';
security[`.${getSecurityPrefix('toolbar')}`] = 'Toolbar';
security[`.${getSecurityPrefix('button')}`] = 'Button';
security[`.${getSecurityPrefix('data-table')}`] = 'DataTable';
security[`.${getSecurityPrefix('data-table-pagination')}`] =
  'DataTablePagination';
security[`.${getSecurityPrefix('delimited-list')}`] = 'DelimitedList';
security[`.${getSecurityPrefix('link--external')}`] = 'ExternalLink';
security[`.${getSecurityPrefix('ica')}`] = 'ICA';
security[`.${getSecurityPrefix('button--icon')}`] = 'ButtonIcon';
security[`.${getSecurityPrefix('nav')}`] = 'Nav';
security[`.${getSecurityPrefix('pill')}`] = 'Pill';
security[`.${getSecurityPrefix('profile-image')}`] = 'ProfileImage';
security[`.${getSecurityPrefix('scroll-gradient')}`] = 'ScrollGradient';
security[`.${getSecurityPrefix('stacked-notification')}`] =
  'StackedNotification';
security[`.${getSecurityPrefix('status-icon')}`] = 'StatusIcon';
security[`.${getSecurityPrefix('string-formatter')}`] = 'StringFormatter';
security[`.${getSecurityPrefix('truncated-list')}`] = 'TruncatedList';
security[`.${getSecurityPrefix('type-layout__container')}`] = 'TypeLayout';
security[`.${getSecurityPrefix('time-indicator')}`] = 'TimeIndicator';
security[`.${getSecurityPrefix('trending-card')}`] = 'TrendingCard';

export { security };
