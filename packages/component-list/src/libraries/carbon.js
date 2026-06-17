import * as componentList from 'carbon-components-react';
import { carbonPrefix } from '../../../web-extension/src/globals/prefixSelectors.js';
import { buildReactComponentList } from '../helpers.js';

const prefix = `${carbonPrefix}--`;

const mockedProps = {
  pageSizes: [0],
  items: [],
};

const ignoredComponents = [
  'ActionableNotification',
  'ContentSwitcher',
  'DangerButton',
  'DataTable',
  'DatePicker',
  'ErrorBoundary',
  'ErrorBoundaryContext',
  'ExpandableSearch',
  'ExpandableTile',
  'FileUploader',
  'FileUploaderSkeleton',
  'Form',
  'FormItem',
  'HeaderContainer',
  'HeaderNavigation',
  'Icon',
  'IconSkeleton',
  'Modal',
  'ModalFooter',
  'ModalHeader',
  'MultiSelect',
  'NumberInput',
  'NumberInputSkeleton',
  'NumberInputV2',
  'OrderedList',
  'OverflowMenu',
  'PasswordInput',
  'PrimaryButton',
  'ProgressIndicator',
  'RadioButtonGroup',
  'RadioButtonSkeleton',
  'SearchLayoutButton',
  'SecondaryButton',
  'Select',
  'SelectSkeleton',
  'SideNavLink',
  'SideNavMenu',
  'SideNavSwitcher',
  'SkeletonIcon',
  'Slider',
  'SliderSkeleton',
  'SwitcherDivider',
  'TableBatchAction',
  'TableBody',
  'TableCell',
  'TableHead',
  'TableHeader',
  'TableRow',
  'TableSelectRow',
  'TableToolbarAction',
  'Tab',
  'TextArea',
  'TextAreaSkeleton',
  'TextInputSkeleton',
  'Tile',
  'TileAboveTheFoldContent',
  'TileBelowTheFoldContent',
  'TileGroup',
  'TimePicker',
  'TimePickerSelect',
  'Toggle',
  'ToggleSkeleton',
  'ToggleSmall',
  'ToggleSmallSkeleton',
  'ToolbarItem',
  'TooltipDefinition',
  'UnorderedList',
];

const manualComponentSelectors = {
  ActionableNotification: '.bx--actionable-notification',
  ContentSwitcher: '.bx--content-switcher',
  DangerButton: '.bx--btn.bx--btn--danger',
  DataTable: 'table.bx--data-table',
  DatePicker: '.bx--date-picker',
  ExpandableSearch: '.bx--search--expandable',
  ExpandableTile: '.bx--tile--expandable',
  FileUploader: '.bx--file',
  FileUploaderSkeleton: '.bx--file.bx--skeleton',
  Form: '.bx--form',
  FormItem: '.bx--form-item',
  HeaderContainer: '.bx--header',
  HeaderNavigation: '.bx--header__nav',
  Icon: '.bx--icon',
  IconSkeleton: '.bx--icon--skeleton',
  Modal: '.bx--modal',
  ModalFooter: '.bx--modal-footer',
  ModalHeader: '.bx--modal-header',
  MultiSelect: '.bx--multi-select',
  NumberInput: '.bx--number',
  NumberInputSkeleton: '.bx--number.bx--skeleton',
  OrderedList: '.bx--list--ordered',
  OverflowMenu: '.bx--overflow-menu',
  PasswordInput: '.bx--text-input-wrapper',
  PrimaryButton: '.bx--btn.bx--btn--primary',
  ProgressIndicator: '.bx--progress',
  RadioButtonGroup: '.bx--radio-button-group',
  RadioButtonSkeleton: '.bx--radio-button.bx--skeleton',
  SearchLayoutButton: '.bx--search-button',
  SecondaryButton: '.bx--btn.bx--btn--secondary',
  Select: '.bx--select',
  SelectSkeleton: '.bx--select.bx--skeleton',
  SideNavLink: '.bx--side-nav__link',
  SideNavMenu: '.bx--side-nav__menu',
  SideNavSwitcher: '.bx--side-nav__switcher',
  SkeletonIcon: '.bx--skeleton__icon',
  Slider: '.bx--slider',
  SliderSkeleton: '.bx--slider.bx--skeleton',
  SwitcherDivider: '.bx--switcher__item',
  TableBatchAction: '.bx--batch-actions__action',
  TableBody: 'table.bx--data-table tbody',
  TableCell: 'table.bx--data-table tbody td',
  TableHead: 'table.bx--data-table thead',
  TableHeader: 'table.bx--data-table thead th',
  TableRow: 'table.bx--data-table tbody tr',
  TableSelectRow: 'table.bx--data-table tbody tr .bx--checkbox',
  TableToolbarAction: '.bx--toolbar-action',
  Tab: '.bx--tabs',
  TextArea: '.bx--text-area',
  TextAreaSkeleton: '.bx--text-area--skeleton',
  TextInputSkeleton: '.bx--text-input--skeleton',
  Tile: '.bx--tile',
  TileAboveTheFoldContent: '.bx--tile-content__above-the-fold',
  TileBelowTheFoldContent: '.bx--tile-content__below-the-fold',
  TileGroup: '.bx--tile-group',
  TimePicker: '.bx--time-picker',
  TimePickerSelect: '.bx--time-picker__select',
  Toggle: '.bx--toggle',
  ToggleSkeleton: '.bx--toggle.bx--skeleton',
  ToggleSmall: '.bx--toggle-input__label',
  ToggleSmallSkeleton: '.bx--toggle-input__label.bx--skeleton',
  ToolbarItem: '.bx--toolbar-item',
  TooltipDefinition: '.bx--tooltip__trigger',
  UnorderedList: '.bx--list--unordered',
};

const filterByTheseComponents = [];

const { _stats, ...components } = buildReactComponentList(
  componentList,
  prefix,
  mockedProps,
  [],
  filterByTheseComponents,
  ignoredComponents
);

const existingComponentNames = new Set(Object.values(components));
let manualAddedCount = 0;

Object.entries(manualComponentSelectors).forEach(([name, selector]) => {
  if (!selector || existingComponentNames.has(name)) {
    return;
  }

  components[selector] = name;
  existingComponentNames.add(name);
  manualAddedCount += 1;
});

_stats.success += manualAddedCount;
_stats.total += manualAddedCount;

const carbonReact = {
  name: 'Carbon',
  version: 'v10',
  components,
  _stats,
};

export { carbonReact };
