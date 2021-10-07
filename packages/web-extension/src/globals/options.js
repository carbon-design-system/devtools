import AlignHorizontalLeft from '@carbon/icons/svg/32/align--horizontal-left.svg';
import AlignHorizontalCenter from '@carbon/icons/svg/32/align--horizontal-center.svg';
import AlignHorizontalRight from '@carbon/icons/svg/32/align--horizontal-right.svg';
import FitToWidth from '@carbon/icons/svg/32/fit-to-width.svg';

const positions = {
  'Full width': FitToWidth,
  Left: AlignHorizontalLeft,
  Center: AlignHorizontalCenter,
  Right: AlignHorizontalRight,
};

const gridVersions = {
  'carbon-v10': '2x grid',
  'carbon-v9': 'v9 grid',
  // "northstar-fluid": 'Northstar fluid',
  // "northstar-v19a": 'Northstar fluid v19a',
  // "northstar-adaptive": 'Northstar adaptive'
};

const aspectRatios = [
  '16:9',
  '9:16',
  '2:1',
  '1:2',
  '4:3',
  '3:4',
  '3:2',
  '2:3',
  '1:1',
];

const svgMarkup = ['svg', 'g', 'path', 'rect', 'polygon', 'circle'];

export { positions, gridVersions, aspectRatios, svgMarkup };
