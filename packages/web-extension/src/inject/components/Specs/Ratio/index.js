import settings from 'carbon-components/es/globals/js/settings';
import { addHighlight } from '../../Highlight';
import { getComponentName } from '@carbon/devtools-utilities/src/getComponentName';
import { experimentalFlag } from '@carbon/devtools-utilities/src/experimental';
import {
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
} from '../../Tooltip';

const { prefix } = settings;

const aspectRatios = ['16:9', '9:16', '2:1', '1:2', '4:3', '3:4', '1:1'];
const aspectRatiosCalc = [16 / 9, 9 / 16, 2 / 1, 1 / 2, 4 / 3, 3 / 4, 1 / 1];
const svgMarkup = ['svg', 'g', 'path', 'rect', 'polygon', 'circle'];

function highlightSpecsRatio(target) {
  const comp = target.getBoundingClientRect();
  const width = Math.round(comp.width);
  const height = Math.round(comp.height);
  const minValue = 16; // get from two mini units?

  if (width > minValue && height > minValue) {
    experimentalFlag(() => {
      const highlightOptions = {};
      const ratioIndex = aspectRatiosCalc.indexOf(width / height);
      const componentName =
        svgMarkup.indexOf(target.nodeName.toLowerCase()) > -1
          ? 'SVG'
          : getComponentName(target); // build this logic into the get component name?

      let tooltipContent = ``;

      if (ratioIndex > -1) {
        highlightOptions.content = aspectRatios[ratioIndex];

        tooltipContent += `<span class="${prefix}--tooltip--primary">${aspectRatios[ratioIndex]} 
                    <span class="${prefix}--tooltip--secondary">(${width}x${height})</span></span>`;
      } else {
        highlightOptions.outline = true;

        tooltipContent += `<span class="${prefix}--tooltip--primary">${width}x${height}</span>`;
      }

      tooltipContent += `<span class="${prefix}--tooltip--secondary">${componentName}</span>`;

      addHighlight(target, { ...highlightOptions, type: 'specs' });
      updateTooltipContent(tooltipContent);
      positionTooltip(target);
      showHideTooltip(true);
    });

    return true;
  }
}

export { highlightSpecsRatio };
