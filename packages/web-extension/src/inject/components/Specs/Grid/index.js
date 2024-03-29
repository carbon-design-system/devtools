import settings from 'carbon-components/es/globals/js/settings';
import { breakpoints, rem } from '@carbon/layout';
import { carbonPrefix } from '../../../../globals';
import { addHighlight } from '../../Highlight';
import {
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
} from '../../Tooltip';

const { prefix } = settings;

const gridSelector = `${carbonPrefix}--grid`;
const rowSelector = `${carbonPrefix}--row`;
const colSelector = `${carbonPrefix}--col`;
const specsGridClass = `${prefix}--specs-grid-tooltip`;
const titleClass = `${specsGridClass}__title`;
const classListClass = `${specsGridClass}__classlist`;

function highlightSpecsGrid(target) {
  // can we use computed values to determine grid, row, col,
  // and free ourselves from class names incase adopters are using mixins?
  const highlightOptions = { outline: true };
  let grid = false;
  let tooltipContent = `<div class="${specsGridClass}">`;

  if (!grid && target && target.classList) {
    if (target.classList.contains(gridSelector)) {
      grid = true;
      tooltipContent += `<h2 class="${titleClass}">Grid</h2>`;
      tooltipContent += `
                <ul class="${classListClass}">
                    <li class="${classListClass}--active">.${gridSelector}</li>
                </ul>
            `;
    }

    if (target.classList.contains(rowSelector)) {
      grid = true;
      tooltipContent += `<h2 class="${titleClass}">Row</h2>`;
      tooltipContent += `
                <ul class="${classListClass}">
                    <li class="${classListClass}--active">.${rowSelector}</li>
                </ul>
            `;
    }

    if (target.classList.value.indexOf(colSelector) > -1) {
      grid = true;

      let classList, active;

      classList = target.classList.value;

      if (classList.indexOf('-sm-') === -1) {
        classList = `${carbonPrefix}--col-sm-4 ${classList}`;
      }

      active = activeBreakpoint(classList);

      classList = classList
        .split(' ')
        .map((className) => {
          if (className.indexOf(colSelector) > -1) {
            if (className.indexOf(active) > -1) {
              return `<li class="${classListClass}--active">.${className}</li>`;
            } else {
              return `<li>.${className}</li>`;
            }
          }
        })
        .filter((d) => d)
        .join('');

      tooltipContent += `<h2 class="${titleClass}">Column</h2>`;
      tooltipContent += `<ul class="${classListClass}">${classList}</ul>`;
    }
  }

  tooltipContent += '</div>';

  if (grid) {
    addHighlight(target, { ...highlightOptions, type: 'specs' });
    updateTooltipContent(tooltipContent);
    positionTooltip(target);
    showHideTooltip(true);
    return grid;
  }
}

function activeBreakpoint(classList) {
  const breakpointKeys = Object.keys(breakpoints);
  const l = breakpointKeys.length;
  const windowWidth = rem(window.innerWidth);
  let breakpointName, breakpoint, active;

  for (let i = 0; i < l; i++) {
    breakpointName = breakpointKeys[i];
    // if class list contains this breakpoint
    if (classList.indexOf(breakpointName) > -1) {
      breakpoint = breakpoints[breakpointName];
      // AND breakpoint width is less than window width
      if (parseInt(breakpoint.width, 10) <= parseInt(windowWidth, 10)) {
        active = breakpointName;
      } else {
        break;
      }
    }
  }

  return active;
}

export { highlightSpecsGrid };
