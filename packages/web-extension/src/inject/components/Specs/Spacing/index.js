import { settings } from 'carbon-components';
import { addHighlight, removeAllHighlights } from '../../Highlight';
import {
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
  __specValueItem,
  __specsContainer,
} from '../../Tooltip';
import {
  getComponentName,
  setPx,
  removeLeadingZero,
} from '@carbon/devtools-utilities';
import { rem, spacing, layout } from '@carbon/layout';

const { prefix } = settings;

const spacersClass = `${prefix}--spacers`;
const spacerBoxClass = `${spacersClass}__box`;

let spacerList, activeTarget;

function manageSpecsSpacing(specs, specType) {
  if (specs && specType === 'spacing') {
    activateSpacing();
  } else {
    deactivateSpacing();
  }
}

function activateSpacing() {
  document.body.addEventListener('mouseover', mouseOver);
  document.body.addEventListener('mouseout', mouseOut);
  injectHTML();
}

function deactivateSpacing() {
  document.body.removeEventListener('mouseover', mouseOver);
  document.body.removeEventListener('mouseout', mouseOut);
}

function mouseOver(e) {
  let target = e.srcElement || e;

  if (
    target.nodeName !== 'BODY' && // stop everything if we've hit the highest node
    !target.classList.contains(spacerBoxClass) && // don't run if we are on a spacer box
    !target.isSameNode(activeTarget)
  ) {
    // don't run if we're already on the activeTarget
    if (!highlightSpacing(target)) {
      // keep going up a the tree if nothing matches
      mouseOver(target.parentNode);
    }
  }
}

function highlightSpacing(target) {
  const boundingBox = target.getBoundingClientRect();
  const styles = window.getComputedStyle(target);

  let spacerCount = 0;

  spacerCount = setSpacers(target, boundingBox, spacerList, {
    top: {
      margin: stripUnit(styles.marginTop),
      padding: stripUnit(styles.paddingTop),
      border: stripUnit(styles.borderTopWidth),
    },
    right: {
      margin: stripUnit(styles.marginRight),
      padding: stripUnit(styles.paddingRight),
      border: stripUnit(styles.borderRightWidth),
    },
    bottom: {
      margin: stripUnit(styles.marginBottom),
      padding: stripUnit(styles.paddingBottom),
      border: stripUnit(styles.borderBottomWidth),
    },
    left: {
      margin: stripUnit(styles.marginLeft),
      padding: stripUnit(styles.paddingLeft),
      border: stripUnit(styles.borderLeftWidth),
    },
  });

  if (spacerCount) {
    activeTarget = target;
    addHighlight(target, 'specs', { outline: true });
    window.addEventListener('scroll', clearOnScroll, true);
    return spacerCount;
  }
}

function clearOnScroll() {
  resetAllSpacers();
  removeAllHighlights();
  showHideTooltip(false);
  window.removeEventListener('scroll', clearOnScroll, true);
}

function mouseOut(e) {
  let target = e.relatedTarget;

  if (
    !target || // if target is null clear it all
    (!target.isSameNode(activeTarget) && // clear it if not going to active target
      !target.classList.contains(spacerBoxClass))
  ) {
    // and if not a spacer
    // if we've hit the end let's stop and remove everything
    activeTarget = null;
    resetAllSpacers();
    removeAllHighlights();
    showHideTooltip(false);
    window.removeEventListener('scroll', clearOnScroll, true);
  }
}

function injectHTML() {
  const spacers = document.querySelector(`.${spacersClass}`);
  const devtoolsContainer = document.querySelector(`.${prefix}--devtools`);

  if (!spacers) {
    const spacersHTML = document.createElement('div');
    spacersHTML.classList.add(spacersClass);

    for (let i = 0; i < 8; i++) {
      spacersHTML.innerHTML += `<div class="${prefix}--spacers__box"></div>`;
    }

    devtoolsContainer.appendChild(spacersHTML);

    spacerList = document.querySelectorAll(`.${spacerBoxClass}`);
    spacerList.forEach((spacer) => {
      spacer.addEventListener('mouseenter', spacerHover);
      spacer.addEventListener('mouseleave', () => showHideTooltip(false));
    });
  }
}

function spacerHover(e) {
  const spacer = e.currentTarget;

  if (spacer.dataset.value.length > 0 && spacer.dataset.component.length > 0) {
    // get token
    // no token value warning
    const value = spacer.dataset.value;
    const spacingToken = getSpacingToken(value);

    let tooltipContent = `<p class="${prefix}--tooltip-specs__value">
                                ${removeLeadingZero(
                                  Math.round(value * 1000) / 1000
                                )}px /
                                ${removeLeadingZero(
                                  Math.round(
                                    parseFloat(rem(value), 10) * 1000
                                  ) / 1000
                                )}rem
                              </p>`;

    if (!spacingToken) {
      tooltipContent += `<ul>
                                ${__specValueItem('warning', 'Token not found')}
                               </ul>`;
    }

    updateTooltipContent(
      __specsContainer([
        {
          eyebrow: spacer.dataset.component,
          title: spacingToken || 'Spacing',
          content: tooltipContent,
        },
      ])
    );
    positionTooltip(spacer); // mouse location?
    showHideTooltip(true);
  }
}

function getSpacingToken(value) {
  const valueRem = rem(value);

  for (let i = 0; i < spacing.length; i++) {
    if (valueRem === spacing[i]) {
      return 'spacing-' + leadingZero(i + 1);
    }
  }

  for (let i = 0; i < layout.length; i++) {
    if (valueRem === layout[i]) {
      return 'layout-' + leadingZero(i + 1);
    }
  }
}

function leadingZero(value) {
  if (value < 10) {
    return '0' + value;
  }

  return value;
}

function setSpacers(target, boundingBox, spacerList, spacingStyles) {
  const orientations = Object.keys(spacingStyles);

  let orientation,
    spacing,
    topLeft,
    bottomRight,
    componentName,
    spacerCount = 0;

  for (let i = 0; i < orientations.length; i++) {
    orientation = orientations[i];
    spacing = spacingStyles[orientation];
    topLeft = ['top', 'left'].indexOf(orientation) > -1;
    bottomRight = ['bottom', 'right'].indexOf(orientation) > -1;

    if (spacing.margin) {
      componentName = componentName || getComponentName(target); // only grab new if not already defined

      spacerCount += positionSpacer(
        componentName,
        Math.abs(spacing.margin), // value
        orientation, // current orientation
        spacerList[spacerCount], // spacer element
        spacingStyles,
        target, // origin target
        boundingBox, // origin target's bounding box
        Math.abs(topLeft ? spacing.margin : 0), // offset value
        true
      );
    }

    if (spacing.padding) {
      componentName = componentName || getComponentName(target); // only grab new if not already defined

      spacerCount += positionSpacer(
        componentName,
        Math.abs(spacing.padding), // value
        orientation, // current orientation
        spacerList[spacerCount], // spacer element
        spacingStyles,
        target, // origin target
        boundingBox, // origin target's bounding box
        Math.abs(bottomRight ? spacing.padding : 0) // offset value
      );
    }
  }

  return spacerCount;
}

function positionSpacer(
  componentName,
  value,
  orientation,
  spacer,
  spacingStyles,
  target,
  boundingBox,
  offset,
  ignoreBorders
) {
  const maxWidth =
    target.clientWidth -
    spacingStyles.left.padding -
    spacingStyles.right.padding;
  const maxHeight =
    target.clientHeight -
    spacingStyles.top.padding -
    spacingStyles.bottom.padding;

  spacer.dataset.value = value;
  spacer.dataset.component = componentName;

  if (value >= 16) {
    spacer.innerHTML = `<span class="value">${value}</span>`;

    if (value < spacer.querySelector('.value').offsetWidth) {
      // if the text doesn't fit in the box then let's remove the text
      spacer.innerHTML = '';
    }
  }

  spacer.style.opacity = 1;
  spacer.style.visibility = 'visible';

  switch (orientation) {
    case 'right':
      spacer.style.top = setPx(
        boundingBox.top +
          spacingStyles.top.padding +
          (ignoreBorders ? 0 : spacingStyles.top.border)
      ); // top + top padding + top border
      spacer.style.left = setPx(
        boundingBox.left +
          boundingBox.width -
          offset -
          (ignoreBorders ? 0 : spacingStyles.right.border)
      ); // left + width - offset container - right border
      spacer.style.height = setPx(value);
      spacer.style.minHeight = setPx(16);
      spacer.style.maxHeight = setPx(maxHeight);
      spacer.style.width = setPx(value);
      break;
    case 'bottom':
      spacer.style.top = setPx(
        boundingBox.top +
          boundingBox.height -
          offset -
          (ignoreBorders ? 0 : spacingStyles.bottom.border)
      ); // top + height - offset container - bottom border
      spacer.style.left = setPx(
        boundingBox.left +
          spacingStyles.left.padding +
          (ignoreBorders ? 0 : spacingStyles.left.border)
      ); // left + left padding + left border
      spacer.style.height = setPx(value);
      spacer.style.width = setPx(value);
      spacer.style.minWidth = setPx(16);
      spacer.style.maxWidth = setPx(maxWidth);
      break;
    case 'left':
      spacer.style.top = setPx(
        boundingBox.top +
          spacingStyles.top.padding +
          (ignoreBorders ? 0 : spacingStyles.top.border)
      ); // top + top padding + top border
      spacer.style.left = setPx(
        boundingBox.left -
          offset +
          (ignoreBorders ? 0 : spacingStyles.left.border)
      ); // left - offset container + left border
      spacer.style.height = setPx(value);
      spacer.style.minHeight = setPx(16);
      spacer.style.maxHeight = setPx(maxHeight);
      spacer.style.width = setPx(value);
      break;
    default:
      // top
      spacer.style.top = setPx(
        boundingBox.top -
          offset +
          (ignoreBorders ? 0 : spacingStyles.top.border)
      ); //  top - offset container + top border
      spacer.style.left = setPx(
        boundingBox.left +
          spacingStyles.left.padding +
          (ignoreBorders ? 0 : spacingStyles.left.border)
      ); // left + left padding + left border
      spacer.style.height = setPx(value);
      spacer.style.width = setPx(value);
      spacer.style.minWidth = setPx(16);
      spacer.style.maxWidth = setPx(maxWidth);
  }

  return 1;
}

function resetAllSpacers() {
  if (spacerList.length > 0) {
    spacerList.forEach((spacer) => {
      spacer.innerHTML = ``;
      spacer.style.width = null;
      spacer.style.height = null;
      spacer.style.minHeight = null;
      spacer.style.maxHeight = null;
      spacer.style.minWidth = null;
      spacer.style.maxWidth = null;
      spacer.style.top = null;
      spacer.style.left = null;
      spacer.style.opacity = null;
      spacer.style.visibility = null;
      spacer.dataset.value = '';
      spacer.dataset.component = '';
    });
  }
}

function stripUnit(value) {
  return parseFloat(value, 10);
}

export { manageSpecsSpacing };
