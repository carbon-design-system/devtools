import settings from 'carbon-components/es/globals/js/settings';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';
import { positions } from '../../../../globals/options';

const { prefix } = settings;

function manage2xGrid() {
  getStorage('toggle2xGridOptions', ({ toggle2xGridOptions }) =>
    manage2xGridOptions(toggle2xGridOptions)
  ); // set based on defaults
  storageItemChanged('toggle2xGridOptions', manage2xGridOptions); // update ui if options change
}

function manage2xGridOptions({
  toggle2xColumns,
  toggle2xGutters,
  toggle2xBorders,
  toggle2xPosition,
  toggle2xBreakpoints,
  toggle2xLeftInfluencer,
  toggle2xRightInfluencer,
}) {
  const html = document.querySelector('html');
  const grid2x = html.querySelector(`.${prefix}--grid-2x`);
  const gridRow = grid2x.querySelector(`.${prefix}--row`);

  // set grid influencers
  gridRow.style.paddingLeft = `${toggle2xLeftInfluencer || 0}px`;
  gridRow.style.paddingRight = `${toggle2xRightInfluencer || 0}px`;

  // hide or show columns
  if (toggle2xColumns) {
    grid2x.classList.add(`${prefix}--grid-2x--inner`);
  } else {
    grid2x.classList.remove(`${prefix}--grid-2x--inner`);
  }

  // hide or show gutters
  if (toggle2xGutters) {
    grid2x.classList.add(`${prefix}--grid-2x--outer`);
  } else {
    grid2x.classList.remove(`${prefix}--grid-2x--outer`);
  }

  // hide or show borders/dividers
  if (toggle2xBorders) {
    grid2x.classList.add(
      `${prefix}--grid-2x--inner-border`,
      `${prefix}--grid-2x--outer-border`
    );
  } else {
    grid2x.classList.remove(
      `${prefix}--grid-2x--inner-border`,
      `${prefix}--grid-2x--outer-border`
    );
  }

  // toggle between different position options
  if (toggle2xPosition) {
    const grid = resetPosition(grid2x);
    grid.classList.add(
      `${prefix}--grid--${toggle2xPosition.toLowerCase().replace(/ /g, '-')}`
    );
  }

  // hide or show breakpoint label
  if (toggle2xBreakpoints) {
    html.classList.add(`${prefix}--grid-2x--breakpoint-label`);
  } else {
    html.classList.remove(`${prefix}--grid-2x--breakpoint-label`);
  }
}

function resetPosition(grid2x) {
  const grid = grid2x.querySelector(`.${prefix}--grid`);

  Object.keys(positions).forEach((position) => {
    grid.classList.remove(
      `${prefix}--grid--${position.toLowerCase().replace(/ /g, '-')}`
    );
  });

  return grid;
}

export { manage2xGrid };
