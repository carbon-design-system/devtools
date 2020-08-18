import { settings } from 'carbon-components';
import { themes } from '@carbon/themes';

const { prefix } = settings;

const body = document.body;
const tooltipClass = `${prefix}--tooltip`;
const tooltipShowClass = `${tooltipClass}--shown`;
const tooltipContentClass = `${tooltipClass}__content`;
const tooltipCaretClass = `${tooltipClass}__caret`;
let clearTooltipAnimation,
    tooltipShowing = false;

// inject tooltip into page on load 
// show hide functions
// update content functions
// update position

function initTooltip () {
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

function updateTooltipContent (content) {
    const tooltipContent = body.querySelector('.' + tooltipContentClass);

    tooltipContent.innerHTML = content;
}

function positionTooltip (component) {
    const boundingBox = component.getBoundingClientRect();
    const tooltip = body.querySelector('.' + tooltipClass);
    const tooltipCaret = tooltip.querySelector('.' + tooltipCaretClass);

    tooltip.style.left = tooltipOffsetX(boundingBox.x, tooltip, component);
    tooltip.style.top = tooltipOffsetY(boundingBox.y, tooltip, tooltipCaret);
    flipTooltip(boundingBox.y, tooltip);
    offsetCaretX(boundingBox, tooltip, tooltipCaret, component);

    if (tooltipShowing) { // don't run if tooltip is hidden
         clearTooltipAnimation = window.requestAnimationFrame(() => positionTooltip(component));
    }
}

function offsetCaretX (boundingBox, tooltip, tooltipCaret, component) {
    // reset carot styles
    tooltipCaret.style.left = null;
    tooltipCaret.style.margin = null;

    // reposition caret over item if too small
    if (tooltip.offsetWidth > component.offsetWidth) {
        let carotOffset;

        if ((boundingBox.x + tooltip.offsetWidth) > window.innerWidth) { // aligned right
            // half of component width + component right + half of carot width
            carotOffset = (component.offsetWidth / 2) + (window.innerWidth - boundingBox.right) + (tooltipCaret.offsetWidth / 2);
            tooltipCaret.style.left = `calc(100% - ${carotOffset}px)`;
            tooltipCaret.style.margin = 0;
        } else if (boundingBox.x < tooltip.offsetWidth) { // aligned left
            // tooltip left + half of component width - half of tooltip carot width
            carotOffset = boundingBox.x + (component.offsetWidth / 2) - (tooltipCaret.offsetWidth / 2);
            tooltipCaret.style.left = setPx(carotOffset);
            tooltipCaret.style.margin = 0;
            
            // carotOffset = (component.offsetWidth / 2) - (tooltipCaret.offsetWidth / 2);
            // tooltipCaret.style.left = setPx(carotOffset < 2 ? 2 : carotOffset); // using two here to get it off the edge
            // tooltipCaret.style.margin = 0;
        }
    }
}

function flipTooltip (y, tooltip) {
    // flip tooltip if item is above the fold
    // make sure tooltip is always pointing in the right direction
    if (y < 0) {
        tooltip.setAttribute('data-floating-menu-direction', 'bottom');
    } else {
        tooltip.setAttribute('data-floating-menu-direction', 'top');
    }
}

function tooltipOffsetY (y, tooltip, tooltipCaret) {
    let offsetValue = y;

    // make sure tooltip is always within viewpoint
    if ((y - tooltip.offsetHeight) < tooltipCaret.offsetHeight) {
        // stick to top instead of going above
        offsetValue = tooltipCaret.offsetHeight;
    } else if (y > (window.innerHeight - tooltip.offsetHeight)) {
        // stick to bottom instead of going below
        offsetValue = window.innerHeight - tooltip.offsetHeight; // need to offset
    } else {
        // by default display tooltip above the given component.
        offsetValue = y - tooltip.offsetHeight + (tooltipCaret.offsetHeight / 2);
    }
    
    return setPx(offsetValue);
}

function tooltipOffsetX (x, tooltip, component) {
    let offsetValue = x;

    // offset whole tooltip and ensure it stays within viewport
    if ((x + tooltip.offsetWidth) > window.innerWidth) {
        // make sure the tooltip doesn't go beyond the right edge of screen
        offsetValue = window.innerWidth - tooltip.offsetWidth;
    } else {
        if (tooltip.offsetWidth > component.offsetWidth) {
            // if component is smaller than tooltip center tooltip over it
            offsetValue = x - (tooltip.offsetWidth / 2) + (component.offsetWidth / 2);
            
            if (offsetValue < 0) {
                // set to zero if we over compinsated so it doesn't fall off the edge
                offsetValue = 0;
            }
        }
    }
    
    return setPx(offsetValue);
}

function setPx (value) {
    return value + 'px';
}

function showHideTooltip (show) {
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

export {
    initTooltip,
    positionTooltip,
    showHideTooltip,
    updateTooltipContent };