import settings from 'carbon-components/es/globals/js/settings';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';

const { prefix } = settings;

const html = document.querySelector('html');
const body = document.body;
const miniUnitGridClass = `${prefix}--grid-mini-unit`;

let miniUnitGrid = document.querySelector('.' + miniUnitGridClass);

function manageMiniUnitGrid() {
  getStorage('toggleMiniUnitGridOptions', ({ toggleMiniUnitGridOptions }) => {
    manageMiniUnitGridOptions(toggleMiniUnitGridOptions);
    setMiniUnitHeight();
  }); // set based on defaults
  storageItemChanged('toggleMiniUnitGridOptions', manageMiniUnitGridOptions); // update ui if options change
}

function setMiniUnitHeight() {
  const scrollHeight = body.scrollHeight;
  miniUnitGrid =
    miniUnitGrid || document.querySelector('.' + miniUnitGridClass);

  if (scrollHeight !== miniUnitGrid.offsetHeight) {
    miniUnitGrid.style.minHeight = scrollHeight + 'px';
  }
}

function showMiniUnitGrid() {
  html.classList.add(`${miniUnitGridClass}--show`);
  window.addEventListener('resize', setMiniUnitHeight);
  window.addEventListener('scroll', setMiniUnitHeight);
}

function hideMiniUnitGrid() {
  html.classList.remove(`${miniUnitGridClass}--show`);
  window.removeEventListener('resize', setMiniUnitHeight);
  window.removeEventListener('scroll', setMiniUnitHeight);
}

function manageMiniUnitGridOptions({
  miniUnitCells,
  miniUnitFix,
  miniUnitVerticalBorders,
  miniUnitHorizontalBorders,
}) {
  miniUnitGrid =
    miniUnitGrid || document.querySelector('.' + miniUnitGridClass);

  // ** show or hide mini unit cells
  if (miniUnitCells) {
    miniUnitGrid.classList.add(`${miniUnitGridClass}--cell`);
  } else {
    miniUnitGrid.classList.remove(`${miniUnitGridClass}--cell`);
  }

  // Toggle between fixing or scrolling mini unit grid
  if (miniUnitFix) {
    miniUnitGrid.classList.add(`${miniUnitGridClass}--fixed`);
  } else {
    miniUnitGrid.classList.remove(`${miniUnitGridClass}--fixed`);
  }

  // show or hide mini unit vertical borders
  if (miniUnitVerticalBorders) {
    miniUnitGrid.classList.add(`${miniUnitGridClass}--vertical`);
  } else {
    miniUnitGrid.classList.remove(`${miniUnitGridClass}--vertical`);
  }

  // show or hide mini unit horizontal borders
  if (miniUnitHorizontalBorders) {
    miniUnitGrid.classList.add(`${miniUnitGridClass}--horizontal`);
  } else {
    miniUnitGrid.classList.remove(`${miniUnitGridClass}--horizontal`);
  }
}

export { manageMiniUnitGrid, showMiniUnitGrid, hideMiniUnitGrid };
