import { settings } from 'carbon-components';
import { getStorage, storageItemChanged } from '@carbon/devtools-utilities';

const { prefix } = settings;

function manageMiniUnitGrid() {
  getStorage('toggleMiniUnitGridOptions', ({ toggleMiniUnitGridOptions }) =>
    manageMiniUnitGridOptions(toggleMiniUnitGridOptions)
  ); // set based on defaults
  storageItemChanged('toggleMiniUnitGridOptions', manageMiniUnitGridOptions); // update ui if options change
}

function manageMiniUnitGridOptions({
  miniUnitCells,
  miniUnitFix,
  miniUnitVerticalBorders,
  miniUnitHorizontalBorders,
}) {
  const miniUnitGrid = document.querySelector(`.${prefix}--grid-mini-unit`);

  // ** show or hide mini unit cells
  if (miniUnitCells) {
    miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--cell`);
  } else {
    miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--cell`);
  }

  // Toggle between fixing or scrolling mini unit grid
  if (miniUnitFix) {
    miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--fixed`);
  } else {
    miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--fixed`);
  }

  // show or hide mini unit vertical borders
  if (miniUnitVerticalBorders) {
    miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--vertical`);
  } else {
    miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--vertical`);
  }

  // show or hide mini unit horizontal borders
  if (miniUnitHorizontalBorders) {
    miniUnitGrid.classList.add(`${prefix}--grid-mini-unit--horizontal`);
  } else {
    miniUnitGrid.classList.remove(`${prefix}--grid-mini-unit--horizontal`);
  }
}

export { manageMiniUnitGrid };
