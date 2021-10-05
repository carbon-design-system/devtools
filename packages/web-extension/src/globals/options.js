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
  'carbon-v10': 'Carbon v10',
  'carbon-v9': 'Carbon v9',
  // "northstar-fluid": 'Northstar fluid',
  // "northstar-v19a": 'Northstar fluid v19a',
  // "northstar-adaptive": 'Northstar adaptive'
};

export { positions, gridVersions };
