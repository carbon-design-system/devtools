import settings from 'carbon-components/es/globals/js/settings';
import {
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
  addHighlight,
  removeAllHighlights,
} from '../';
import { sendMessage } from '@carbon/devtools-utilities/src/sendMessage';
import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import { randomId } from '@carbon/devtools-utilities/src/randomId';
import {
  shadowCollection,
  shadowDomCollector,
  findAllDomShadow,
  findSingleDomShadow,
  shadowContent,
} from '@carbon/devtools-utilities/src/shadowDom';
import {
  libraries,
  _results as _totals,
} from '@carbon/devtools-component-list/dist/index.json';

const { prefix } = settings;
const idselector = 'bxdevid'; // should this be in prefix selector file?

let DOMwatch;
let waitForObserverToEnd;
let inventory;

function initInventory() {
  getMessage((msg) => {
    if (msg.requestInventory) {
      const inventoryData = getInventory(libraries);
      sendMessage({ inventoryData: inventoryData });

      // re-render if page updates
      if (!DOMwatch) {
        // don't add more than once
        DOMwatch = new MutationObserver((mutationList) => {
          const isSpecs = document.querySelector(`html.${prefix}--specs`);

          mutationList.forEach((mutation) => {
            if (mutation.type === 'childList' && isSpecs) {
              clearTimeout(waitForObserverToEnd);

              waitForObserverToEnd = setTimeout(() => {
                getInventory(libraries, false);
                // do we need to send a message back to pop up
                // incase a component has been added or removed while open?
              }, 100);
            }
          });
        });

        DOMwatch.observe(
          document.querySelector(`body > *:not(.${prefix}--devtools)`),
          {
            childList: true,
            attributes: false,
            subtree: true,
          }
        );
      }
    }

    if (msg.inventoryComponentMouseOut) {
      // remove all highlights when mouse out
      removeInventoryHighlights(msg.inventoryComponentMouseOut);
    }

    if (msg.inventoryComponentMouseOver) {
      // highlight each in list
      highlightInventoryItems(msg.inventoryComponentMouseOver);
    }

    if (msg.inventoryComponentClicked) {
      // scroll component into view
      scrollIntoView(msg.inventoryComponentClicked);
    }
  });
}

function scrollIntoView(id) {
  const component = findSingleDomShadow(`[data-${idselector}*="${id}"]`);

  if (component) {
    const bodyRect = document.body.getBoundingClientRect();
    const componentRect = component.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let scrollToPosition = componentRect.top - bodyRect.top;

    if (componentRect.height < windowHeight) {
      // center it on the page if component height is less than window height
      scrollToPosition =
        scrollToPosition -
        windowHeight / 2 + // centers basic position top on screen
        componentRect.height / 2; // centers component on screen
    }

    if (componentRect.top < 0 || componentRect.bottom > windowHeight) {
      // avoid scrolling if fixed, or in view already
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth',
      });
    }
  }
}

function highlightInventoryItems(ids) {
  doThisByIds(ids, highlightInventoryItem);
}

function removeInventoryHighlights() {
  // doThisByIds(ids, (comp) => removeHighlight(comp, 'inventory'));
  removeAllHighlights();
  showHideTooltip(false);
}

function highlightInventoryItem(component, id, showTooltip) {
  addHighlight(component, { type: 'inventory' });

  if (showTooltip) {
    const idPosition = component.dataset[idselector].split(',').indexOf(id);
    const componentName =
      component.dataset.componentname.split(',')[idPosition];

    showHideTooltip(true);
    positionTooltip(component);
    updateTooltipContent(`
            <span class="${prefix}--tooltip--primary">${componentName}</span>
            <span class="${prefix}--tooltip--secondary">${component.offsetWidth}x${component.offsetHeight}</span>`);
  }
}

function doThisByIds(ids, callback) {
  const beginning = `[data-${idselector}*="`;
  const end = `"]`;
  const selector = beginning + ids.join(end + ', ' + beginning) + end;

  if (ids.length === 1) {
    const component = findSingleDomShadow(selector);

    if (component) {
      callback(component, ids[0], true);
    }
  } else if (ids.length > 0) {
    const components = findAllDomShadow(selector);

    if (components.length) {
      for (let i = 0; i < components.length; i++) {
        callback(components[i], ids[i], false);
      }
    }
  }
}

function resetInventory() {
  shadowCollection.set = shadowDomCollector(document.body);

  const components = findAllDomShadow(`[data-${idselector}]`);

  inventory = {
    _totals,
    _results: {
      totalCount: 0,
      uniqueCount: 0,
    },
  };

  if (components.length > 0) {
    for (let i = 0; i < components.length; i++) {
      components[i].removeAttribute(`data-${idselector}`);
      components[i].removeAttribute(`data-componentname`);
    }
  }
}

function getInventory(reset = true) {
  if (reset) {
    resetInventory();
  }

  const libraryKeys = Object.keys(libraries);

  for (let i = 0; i < libraryKeys.length; i++) {
    const libraryName = libraryKeys[i];
    const librarySelectors = libraries[libraryName];

    getInventoryCollection(libraryName, librarySelectors);
  }

  return inventory;
}

function getInventoryCollection(libraryName, componentList) {
  // TODO: prefix check first?
  // document.querySelector('.bx--');

  const selectors = Object.keys(componentList);

  for (let i = 0; i < selectors.length; i++) {
    // loop through indidivual selectors/components
    const selector = selectors[i];
    const componentName = componentList[selector];
    const components = findAllDomShadow(selector);
    const inventoryData = updateInventory(
      componentName,
      libraryName,
      components
    );

    if (inventoryData.length > 0) {
      if (!inventory[libraryName]) {
        // set the library in place if it doesn't exist yet
        inventory[libraryName] = {};
        inventory._results[libraryName] = {
          unique: 0,
          total: 0,
        };
      }

      if (!inventory[libraryName][componentName]) {
        inventory._results.uniqueCount += 1; // add to the unique count
        inventory._results[libraryName].unique += 1; // add to the unique count for the library
        inventory[libraryName][componentName] = inventoryData;
      } else {
        inventory[libraryName][componentName].concat(inventoryData);
      }

      inventory._results.totalCount += inventoryData.length; // add to the total count
      inventory._results[libraryName].total += inventoryData.length; // add to the total count for the library
    }
  }

  return inventory;
}

function updateInventory(componentName, libraryName, components) {
  const inventory = [];

  if (components.length > 0) {
    // if no components don't waste more time
    for (let i = 0; i < components.length; i++) {
      // loop through each component and build data, and assign ids
      const component = components[i];
      const uniqueID = randomId();
      const componentNames = component.dataset['componentname'];
      let push = false;

      if (!componentNames) {
        component.dataset[idselector] = uniqueID; // set a unique id to find later
        component.dataset['componentname'] = componentName; // set a unique id to find later
        push = true;
      } else if (componentNames.indexOf(componentName) === -1) {
        component.dataset[idselector] += ',' + uniqueID; // set a unique id to find later
        component.dataset['componentname'] += ',' + componentName; // set a unique id to find later
        push = true;
      }

      if (push) {
        inventory.push({
          library: libraryName,
          name: componentName,
          uniqueID: uniqueID,
          outerHTML: component.outerHTML,
          innerText: shadowContent(component.childNodes), // not really innertext anymore
          tag: component.localName,
          id: component.id,
          classes: component.classList.value.split(' '),
          autoid:
            component.dataset['autoid'] || component.dataset['auto-id'] || '',
          href: component.href,
          src: component.src,
        });
      }
    }
  }

  return inventory;
}

export { initInventory };
