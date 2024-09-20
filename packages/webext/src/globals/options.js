import {
  AlignHorizontalLeft32,
  AlignHorizontalCenter32,
  AlignHorizontalRight32,
  FitToWidth32,
} from '@carbon/icons-react';

const positions = {
  'Full width': FitToWidth32,
  Left: AlignHorizontalLeft32,
  Center: AlignHorizontalCenter32,
  Right: AlignHorizontalRight32,
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
