import settings from 'carbon-components/es/globals/js/settings';
import { findAllDomShadow } from '@carbon/devtools-utilities/src/shadowDom';

const { prefix } = settings;

const highlightClass = `${prefix}--highlight`;
const relativeClass = `${highlightClass}--relative`;
const outlineClass = `${highlightClass}--outline`;
const inlineClass = `${highlightClass}--inline`;

function addHighlight(component, type = '', options = {}) {
  if (type) {
    type = '--' + type; // "specs" type becomes "--specs"
  }

  if (options.outline) {
    component.classList.add(outlineClass);
  }

  if (options.content) {
    component.dataset.highlightcontent = options.content;
  }

  conditionalHighlights(component);
  component.classList.add(highlightClass);
  component.classList.add(highlightClass + type);
}

function removeHighlight(component, type) {
  if (type) {
    type = '--' + type; // "specs" type becomes "--specs"
  }

  component.classList.remove(highlightClass);
  component.classList.remove(highlightClass + type);
  component.classList.remove(relativeClass);
  component.classList.remove(inlineClass);
  component.classList.remove(outlineClass);

  component.dataset.highlightcontent = '';
}

function removeAllHighlights() {
  const comps = findAllDomShadow('.' + highlightClass);

  if (comps.length > 0) {
    for (let i = 0; i < comps.length; i += 1) {
      removeHighlight(comps[i], 'grid');
      removeHighlight(comps[i], 'specs');
      removeHighlight(comps[i], 'inventory');
    }
  }
}

function conditionalHighlights(component) {
  const computed = getComputedStyle(component);
  const position = computed.position;
  const display = computed.display;

  if (
    position !== 'fixed' &&
    position !== 'absolute' &&
    position !== 'relative' &&
    position !== 'sticky'
  ) {
    component.classList.add(relativeClass);
  }

  if (display === 'inline') {
    component.classList.add(inlineClass);
  }
}

export { addHighlight, removeHighlight, removeAllHighlights };
