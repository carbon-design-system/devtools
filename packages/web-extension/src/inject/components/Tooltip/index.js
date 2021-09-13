import settings from 'carbon-components/es/globals/js/settings';
import { setPx } from '@carbon/devtools-utilities/src/setPx';

const { prefix } = settings;

const body = document.body;
const tooltipClass = `${prefix}--tooltip`;
const tooltipShowClass = `${tooltipClass}--shown`;
const tooltipContentClass = `${tooltipClass}__content`;
const tooltipCaretClass = `${tooltipClass}__caret`;
let clearTooltipAnimation,
  tooltipShowing = false;

function initTooltip() {
  const tooltip = body.querySelector('.' + tooltipClass);
  const devtoolsContainer = body.querySelector(`.${prefix}--devtools`);

  if (!tooltip) {
    const tooltipHTML = document.createElement('div');
    tooltipHTML.classList.add(tooltipClass);
    tooltipHTML.setAttribute('data-floating-menu-direction', 'top');
    tooltipHTML.innerHTML = `
                  <span class="${tooltipClass}__caret"></span>
                  <div class="${tooltipClass}__content" tabindex="-1" role="dialog"></div>
              `;
    devtoolsContainer.appendChild(tooltipHTML);
  }
}

function updateTooltipContent(content) {
  const tooltipContent = body.querySelector('.' + tooltipContentClass);

  tooltipContent.innerHTML = content;
}

function positionTooltip(component) {
  const boundingBox = component.getBoundingClientRect();
  const tooltip = body.querySelector('.' + tooltipClass);
  const tooltipCaret = tooltip.querySelector('.' + tooltipCaretClass);

  tooltip.style.left = tooltipOffsetX(boundingBox, tooltip, component);
  tooltip.style.top = tooltipOffsetY(boundingBox, tooltip, tooltipCaret);
  offsetCaretX(boundingBox, tooltip, tooltipCaret, component);

  if (tooltipShowing) {
    // don't run if tooltip is hidden
    clearTooltipAnimation = window.requestAnimationFrame(() =>
      positionTooltip(component)
    );
  }
}

function offsetCaretX(boundingBox, tooltip, tooltipCaret) {
  // reset carot styles
  tooltipCaret.style.left = null;
  tooltipCaret.style.margin = null;

  // reposition caret over item if too small
  if (tooltip.offsetWidth > boundingBox.width) {
    let carotOffset;

    if (boundingBox.x + tooltip.offsetWidth >= window.innerWidth) {
      // aligned right
      // half of component width + component right + half of carot width
      carotOffset =
        boundingBox.width / 2 +
        (window.innerWidth - boundingBox.right) +
        tooltipCaret.offsetWidth / 2;
      tooltipCaret.style.left = `calc(100% - ${carotOffset}px)`;
      tooltipCaret.style.margin = 0;
    } else if (boundingBox.right < tooltip.offsetWidth) {
      // aligned left
      // component left + half of component width - half of tooltip carot width
      carotOffset =
        boundingBox.x + boundingBox.width / 2 - tooltipCaret.offsetWidth / 2;
      tooltipCaret.style.left = setPx(carotOffset);
      tooltipCaret.style.margin = 0;
    }
  }
}

function flipTooltip(tooltip, direction) {
  tooltip.setAttribute('data-floating-menu-direction', direction);
}

function tooltipOffsetY(comp, tooltip, tooltipCaret) {
  const compBottom = comp.bottom;
  const compTop = comp.y;
  const tooltipHeight = tooltip.offsetHeight;
  const windowHeight = window.innerHeight;
  const caretHeight = tooltipCaret.offsetHeight;

  let offsetValue = caretHeight; // 3. fix to top by default
  let caretDirection = 'top';

  // 1. room on top?
  if (compTop >= tooltipHeight) {
    // // 1a. below the screen?
    if (compTop > windowHeight) {
      offsetValue = windowHeight - tooltipHeight; // fix to bottom of screen
    } else {
      offsetValue = compTop - tooltipHeight; // fix to top of comp
    }

    // 2. room on bottom?
  } else if (compBottom + tooltipHeight <= windowHeight) {
    // // 2a. above the screen?
    if (compBottom > caretHeight) {
      offsetValue = compBottom + caretHeight; // fix to bottom of comp
    }

    caretDirection = 'bottom';
  }

  flipTooltip(tooltip, caretDirection);
  return setPx(offsetValue);
}

function tooltipOffsetX({ x, width }, tooltip) {
  let offsetValue = x;

  // offset whole tooltip and ensure it stays within viewport
  if (x + tooltip.offsetWidth > window.innerWidth) {
    // right
    // make sure the tooltip doesn't go beyond the right edge of screen
    offsetValue = window.innerWidth - tooltip.offsetWidth;
  } else if (tooltip.offsetWidth > width) {
    // if component is smaller than tooltip center tooltip over it
    offsetValue = x - tooltip.offsetWidth / 2 + width / 2;

    if (offsetValue < 0) {
      // set to zero if we over compinsated so it doesn't fall off the edge
      offsetValue = 0;
    }
  }

  return setPx(offsetValue);
}

function showHideTooltip(show) {
  const tooltip = body.querySelector('.' + tooltipClass);

  if (show) {
    tooltipShowing = true;
    tooltip.classList.add(tooltipShowClass);
  } else {
    tooltipShowing = false;
    cancelAnimationFrame(clearTooltipAnimation);
    tooltip.classList.remove(tooltipShowClass);
  }
}

function __specValueItem(type, value) {
  let html;

  if (type === 'warning') {
    html = `
            <li class="${prefix}--tooltip-specs__warning">
                ${value}
            </li>
        `;
  } else {
    html = `<li>`;

    if (type) {
      html += `<h3 class="${prefix}--tooltip-specs__prop">${type}</h3>`;
    }

    if (value) {
      html += `<p class="${prefix}--tooltip-specs__value">${value}</p>`;
    }

    html += `</li>`;
  }

  return html;
}

function __specsContainer(groups) {
  let groupsContent = '';
  let groupLayoutClass = '';

  if (groups.length === 1) {
    groupLayoutClass = `${prefix}--tooltip-specs__group--single`;
  } else if (groups.length === 2) {
    groupLayoutClass = `${prefix}--tooltip-specs__group--duo`;
  }

  groups.forEach(({ eyebrow, title, content }) => {
    groupsContent += `<div class="${prefix}--tooltip-specs__group ${groupLayoutClass}">`;

    if (eyebrow) {
      groupsContent += `<h1 class="${prefix}--tooltip-specs__eyebrow">${eyebrow}</h1>`;
    }

    if (title) {
      groupsContent += `<h2 class="${prefix}--tooltip-specs__title">${title}</h2>`;
    }

    if (content) {
      groupsContent += content;
    }

    groupsContent += `</div>`;
  });

  return `
        <div class="${prefix}--tooltip-specs">
            ${groupsContent}
        </div>
    `;
}

export {
  initTooltip,
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
  __specValueItem,
  __specsContainer,
};
