import settings from 'carbon-components/es/globals/js/settings';
import { findAllDomShadow } from '@carbon/devtools-utilities/src/shadowDom';
import { randomId } from '@carbon/devtools-utilities/src/randomId';

const { prefix } = settings;

const devtoolsClass = `${prefix}--devtools`;
const highlightsContainerClass = `${prefix}--highlights`;
const highlightClass = `${prefix}--highlight`;
const outlineClass = `${highlightClass}--outline`;

function injectHighlights() {
  let highlightContainer = document.querySelector(
    '.' + highlightsContainerClass
  );

  if (!highlightContainer) {
    const devtools = document.querySelector('.' + devtoolsClass);

    if (devtools) {
      highlightContainer = document.createElement('div');
      highlightContainer.classList.add(highlightsContainerClass);

      devtools.prepend(highlightContainer);
    }
  }

  return highlightContainer;
}

function addHighlight(component, options = {}) {
  const highlightContainer = injectHighlights();
  const matchingHighlight = highlightContainer.querySelector(
    `[data-highlightid="${component.dataset.highlightid}"]`
  );

  if (!matchingHighlight) {
    // if the component is already highlight ignore adding another one

    let highlight, type;
    const contentMax = 40;
    const highlightID = randomId();
    const comp = component.getBoundingClientRect();
    const reuseHighlight = highlightContainer.querySelector(
      `div:not(.${highlightClass})`
    );

    if (reuseHighlight) {
      highlight = reuseHighlight;
    } else {
      highlight = document.createElement('div');
    }

    if (options.type) {
      type = '--' + options.type; // "specs" type becomes "--specs"
    }

    if (options.outline) {
      highlight.classList.add(outlineClass);
    }

    highlight.classList.add(highlightClass);
    highlight.classList.add(highlightClass + type);

    highlight.style.top = comp.top + window.scrollY + 'px';
    highlight.style.left = comp.left + window.scrollX + 'px';
    highlight.style.width = comp.width + 'px';
    highlight.style.height = comp.height + 'px';

    highlight.dataset.highlightid = highlightID;
    component.dataset.highlightid = highlightID;

    // new styling
    if (!reuseHighlight) {
      highlightContainer.append(highlight);
    }

    if (
      options.content &&
      comp.width >= contentMax &&
      comp.height >= contentMax
    ) {
      highlight.innerHTML = `<span>${options.content}</span>`;
      setContenSize(highlight, highlight.querySelector('span'));
    }
  }
}

function setContenSize(highligh, content) {
  // resizes content to 50% of highlight box
  const match = 0.5;
  const maxWidth = 640; // per content guidelines max width standards
  let contentSize = content.offsetWidth;
  let containerSize = highligh.clientWidth;

  if (content.offsetHeight > contentSize) {
    // if the content height is larger than the width than we'll adjust things based on height so not to exceed to the container's boundaries
    contentSize = content.offsetHeight;
    containerSize = highligh.clientHeight;
  }

  if (containerSize > maxWidth) {
    // this keeps this text from becoming too much on larger images for now
    containerSize = maxWidth;
  }

  content.style.transform = `scale(${
    (containerSize * match * 1) / contentSize
  })`;
}

function removeHighlight(component) {
  component.setAttribute('class', '');
  component.setAttribute('style', '');
  component.setAttribute('data-highlightid', '');
  component.innerHTML = '';
}

function removeAllHighlights() {
  const comps = findAllDomShadow('.' + highlightClass);

  if (comps.length > 0) {
    for (let i = 0; i < comps.length; i += 1) {
      removeHighlight(comps[i]);
    }
  }
}

export { addHighlight, removeHighlight, removeAllHighlights, injectHighlights };
