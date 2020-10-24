import { settings } from 'carbon-components';
import { addHighlight, removeAllHighlights } from '../../Highlight';
import { getComponentName } from '@carbon/devtools-utilities';
import {
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
} from '../../Tooltip';

const { prefix } = settings;

const aspectRatios = ['16:9', '9:16', '2:1', '1:2', '4:3', '3:4', '1:1'];
const aspectRatiosCalc = [16 / 9, 9 / 16, 2 / 1, 1 / 2, 4 / 3, 3 / 4, 1 / 1];

function manageSpecsRatio(specs, specType) {
  if (specs && specType === 'ratio') {
    activateRatio();
  } else {
    deactivateRatio();
  }
}

function activateRatio() {
  document.body.addEventListener('mouseover', mouseOver);
  document.body.addEventListener('mouseout', mouseOut);
}

function deactivateRatio() {
  document.body.removeEventListener('mouseover', mouseOver);
  document.body.removeEventListener('mouseout', mouseOut);
}

function mouseOver(e) {
  let target = e.srcElement || e;

  highlightRatio(target);
}

function highlightRatio(target) {
  const highlightOptions = {};
  const comp = target.getBoundingClientRect();
  const width = Math.round(comp.width);
  const height = Math.round(comp.height);
  const ratioIndex = aspectRatiosCalc.indexOf(width / height);

  let tooltipContent = ``;

  if (ratioIndex > -1) {
    target.dataset['highlightcontent'] = aspectRatios[ratioIndex];

    tooltipContent += `<span class="${prefix}--tooltip--primary">${aspectRatios[ratioIndex]} 
        <span class="${prefix}--tooltip--secondary">(${width}x${height})</span></span>`;
    // tooltipContent += ``;
  } else {
    highlightOptions.outline = true;

    tooltipContent += `<span class="${prefix}--tooltip--primary">${width}x${height}</span>`;
  }

  tooltipContent += `<span class="${prefix}--tooltip--secondary">${getComponentName(
    target
  )}</span>`;

  addHighlight(target, 'specs', highlightOptions);
  updateTooltipContent(tooltipContent);
  positionTooltip(target);
  showHideTooltip(true);
  document.addEventListener('scroll', clearOnScroll, true);
}

function clearOnScroll() {
  showHideTooltip(false);
  removeAllHighlights();
  document.removeEventListener('scroll', clearOnScroll, true);
}

function mouseOut(e) {
  e.srcElement.dataset['highlightcontent'] = '';
  removeAllHighlights();
  showHideTooltip(false);
  document.removeEventListener('scroll', clearOnScroll, true);
}

export { manageSpecsRatio };
