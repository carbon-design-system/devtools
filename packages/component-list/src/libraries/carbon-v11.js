import * as componentList from '@carbon/react';
import { buildReactComponentList } from '../helpers.js';

const prefix = 'cds--';

const mockedProps = {
  pageSizes: [0],
  items: [],
};

// Components that fail auto-detection and need manual selectors
const ignoredComponents = [
  'ActionableNotification',
  'Breadcrumb',
  'BreadcrumbItem',
  'ComboBox',
  'ContentSwitcher',
  'DataTable',
  'DatePicker',
  'ExpandableSearch',
  'ExpandableTile',
  'FileUploader',
  'FileUploaderSkeleton',
  'FileUploaderItem',
  'Form',
  'FormItem',
  'HeaderContainer',
  'HeaderNavigation',
  'Layer',
  'Modal',
  'ModalFooter',
  'ModalHeader',
  'MultiSelect',
  'NumberInput',
  'NumberInputSkeleton',
  'OrderedList',
  'OverflowMenu',
  'PasswordInput',
  'ProgressIndicator',
  'RadioButtonGroup',
  'RadioButtonSkeleton',
  'Select',
  'SelectSkeleton',
  'SideNavLink',
  'SideNavMenu',
  'SkeletonIcon',
  'SkeletonPlaceholder',
  'Slider',
  'SliderSkeleton',
  'Stack',
  'SwitcherDivider',
  'Tab',
  'TableBatchAction',
  'TableBody',
  'TableCell',
  'TableHead',
  'TableHeader',
  'TableRow',
  'TableSelectRow',
  'TextArea',
  'TextAreaSkeleton',
  'TextInputSkeleton',
  'Tile',
  'TileAboveTheFoldContent',
  'TileBelowTheFoldContent',
  'TimePicker',
  'TimePickerSelect',
  'Toggle',
  'ToggleSkeleton',
  'TooltipDefinition',
  'UnorderedList',
];

// v11 cds-- selectors for components that can't be auto-detected
const manualComponentSelectors = {
  ActionableNotification: '.cds--actionable-notification',
  Breadcrumb: '.cds--breadcrumb',
  BreadcrumbItem: '.cds--breadcrumb-item',
  ComboBox: '.cds--combo-box',
  ContentSwitcher: '.cds--content-switcher',
  DataTable: 'table.cds--data-table',
  DatePicker: '.cds--date-picker',
  ExpandableSearch: '.cds--search--expandable',
  ExpandableTile: '.cds--tile--expandable',
  FileUploader: '.cds--file',
  FileUploaderSkeleton: '.cds--file.cds--skeleton',
  FileUploaderItem: '.cds--file__selected-file',
  Form: '.cds--form',
  FormItem: '.cds--form-item',
  HeaderContainer: '.cds--header',
  HeaderNavigation: '.cds--header__nav',
  Layer: '.cds--layer',
  Modal: '.cds--modal',
  ModalFooter: '.cds--modal-footer',
  ModalHeader: '.cds--modal-header',
  MultiSelect: '.cds--multi-select',
  NumberInput: '.cds--number',
  NumberInputSkeleton: '.cds--number.cds--skeleton',
  OrderedList: '.cds--list--ordered',
  OverflowMenu: '.cds--overflow-menu',
  PasswordInput: '.cds--text-input-wrapper--password',
  ProgressIndicator: '.cds--progress',
  RadioButtonGroup: '.cds--radio-button-group',
  RadioButtonSkeleton: '.cds--radio-button.cds--skeleton',
  Select: '.cds--select',
  SelectSkeleton: '.cds--select.cds--skeleton',
  SideNavLink: '.cds--side-nav__link',
  SideNavMenu: '.cds--side-nav__menu',
  SkeletonIcon: '.cds--skeleton__icon',
  SkeletonPlaceholder: '.cds--skeleton__placeholder',
  Slider: '.cds--slider',
  SliderSkeleton: '.cds--slider.cds--skeleton',
  Stack: '.cds--stack',
  SwitcherDivider: '.cds--switcher__item',
  Tab: '.cds--tabs',
  TableBatchAction: '.cds--batch-actions__action',
  TableBody: 'table.cds--data-table tbody',
  TableCell: 'table.cds--data-table tbody td',
  TableHead: 'table.cds--data-table thead',
  TableHeader: 'table.cds--data-table thead th',
  TableRow: 'table.cds--data-table tbody tr',
  TableSelectRow: 'table.cds--data-table tbody tr .cds--checkbox',
  TextArea: '.cds--text-area',
  TextAreaSkeleton: '.cds--text-area--skeleton',
  TextInputSkeleton: '.cds--text-input--skeleton',
  Tile: '.cds--tile',
  TileAboveTheFoldContent: '.cds--tile-content__above-the-fold',
  TileBelowTheFoldContent: '.cds--tile-content__below-the-fold',
  TimePicker: '.cds--time-picker',
  TimePickerSelect: '.cds--time-picker__select',
  Toggle: '.cds--toggle',
  ToggleSkeleton: '.cds--toggle.cds--skeleton',
  TooltipDefinition: '.cds--definition-tooltip',
  UnorderedList: '.cds--list--unordered',
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

const carbonReactV11 = {
  name: 'Carbon v11',
  version: 'v11',
  components,
  _stats,
};

export { carbonReactV11 };
