import settings from 'carbon-components/es/globals/js/settings';
import { storageItemChanged } from '@carbon/devtools-utilities/src/storageItemChanged';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { gridVersions } from '../../../globals/options';
import { defaults } from '../../../globals/defaults';
import { manage2xGrid } from './2x';
import {
  manageMiniUnitGrid,
  showMiniUnitGrid,
  hideMiniUnitGrid,
} from './mini-unit';
import { themes } from '@carbon/themes';

const { prefix } = settings;
const html = document.querySelector('html');
const gridVersionsList = Object.keys(gridVersions);
const themeList = [...Object.keys(themes), 'system'];

let lastTheme = '';
let lastGridVersion = '';

function initGrid() {
  const body = html.querySelector('body');
  const devtoolContainerClass = `${prefix}--devtools`;
  const numOfColumns = 16;
  const columns = [];

  let gridContainer = body.querySelector(`.${devtoolContainerClass}`);

  html.classList.add(`${prefix}--grid--hide`);

  for (let i = 0; i < numOfColumns; i++) {
    columns.push(
      `<div class="${prefix}--col-sm-1 ${prefix}--col-md-1 ${prefix}--col-lg-1"></div>`
    );
  }

  const GRID_HTML = `
        <div class="${prefix}--grid-2x">
            <div class="${prefix}--grid">
                <div class="${prefix}--row">
                    ${columns.join('')}
                </div>
            </div>
        </div>
        <div class="${prefix}--grid-mini-unit"></div>`;

  if (!gridContainer) {
    gridContainer = document.createElement('div');
    gridContainer.classList.add(devtoolContainerClass);
    gridContainer.innerHTML = GRID_HTML;
    body.appendChild(gridContainer);
  }

  // updates if storage changes
  manageGlobals();
  manage2xGrid();
  manageMiniUnitGrid();
}

function manageGlobals() {
  const grid2x = html.querySelector(`.${prefix}--grid-2x`);

  getStorage('globalToggleStates', ({ globalToggleStates }) =>
    manageGlobalToggle(globalToggleStates)
  );
  storageItemChanged('globalToggleStates', manageGlobalToggle);

  getStorage('toggleGrids', ({ toggleGrids }) => manageGrids(toggleGrids));
  storageItemChanged('toggleGrids', manageGrids);

  getStorage('generalTheme', ({ generalTheme }) =>
    manageGeneralTheme(generalTheme)
  );
  storageItemChanged('generalTheme', manageGeneralTheme);

  getStorage('gridVersion', ({ gridVersion }) =>
    manageGridVersion(gridVersion)
  );
  storageItemChanged('gridVersion', manageGridVersion);

  function manageGlobalToggle({ gridoverlay }) {
    // this may not belong here?
    if (gridoverlay) {
      html.classList.remove(`${prefix}--grid--hide`);
    } else {
      html.classList.add(`${prefix}--grid--hide`);
    }
  }

  function manageGrids({ toggle2xGrid, toggleMiniUnitGrid }) {
    // hide and show 2x grid
    if (toggle2xGrid) {
      grid2x.classList.remove(`${prefix}--grid-2x--hide`);
    } else {
      grid2x.classList.add(`${prefix}--grid-2x--hide`);
    }

    // show or hide mini unit grid
    if (toggleMiniUnitGrid) {
      showMiniUnitGrid();
    } else {
      hideMiniUnitGrid();
    }
  }

  function manageGeneralTheme(generalTheme = defaults.generalSettings.theme) {
    if (generalTheme !== lastTheme) {
      html.classList.remove(...themeList.map((theme) => `${prefix}--${theme}`)); // remove any first
      html.classList.add(`${prefix}--${generalTheme}`); // set updated theme
      lastTheme = generalTheme;
    }
  }

  function manageGridVersion(gridVersion = defaults.gridVersion) {
    if (gridVersion !== lastGridVersion) {
      html.classList.remove(
        ...gridVersionsList.map((version) => `${prefix}--grid--${version}`)
      ); // remove any first
      html.classList.add(`${prefix}--grid--${gridVersion}`); // set updated theme
      lastTheme = gridVersion;
    }
  }
}

export { initGrid };
