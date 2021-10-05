import AlignHorizontalLeft from '@carbon/icons-react/es/align--horizontal-left/16';
import AlignHorizontalCenter from '@carbon/icons-react/es/align--horizontal-center/16';
import AlignHorizontalRight from '@carbon/icons-react/es/align--horizontal-right/16';
import FitToWidth from '@carbon/icons-react/es/fit-to-width/16';

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
