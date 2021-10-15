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
import { allComponents } from '../../../globals/componentList';

const { prefix } = settings;
const idselector = 'bxdevid'; // should this be in prefix selector file?

let DOMwatch;
let waitForObserverToEnd;
let inventory;

function initInventory() {
  sendMessage({ initInventory: true });

  getMessage((msg) => {
    if (msg.requestInventory) {
      sendMessage({ inventoryData: getInventory(allComponents) });

      // re-render if page updates
      if (!DOMwatch) {
        // don't add more than once
        DOMwatch = new MutationObserver((mutationList) => {
          const isSpecs = document.querySelector(`html.${prefix}--specs`);

          mutationList.forEach((mutation) => {
            if (mutation.type === 'childList' && isSpecs) {
              clearTimeout(waitForObserverToEnd);

              waitForObserverToEnd = setTimeout(() => {
                getInventory(allComponents, false);
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
    totalCount: 0,
    uniqueCount: 0,
    all: {},
  };

  if (components.length > 0) {
    for (let i = 0; i < components.length; i++) {
      components[i].removeAttribute(`data-${idselector}`);
      components[i].removeAttribute(`data-componentname`);
    }
  }
}

function getInventory(componentList, reset = true) {
  const selectors = Object.keys(componentList);

  if (reset) {
    resetInventory();
  }

  for (let i = 0; i < selectors.length; i++) {
    // loop through indidivual selectors/components
    const selector = selectors[i];
    const componentName = componentList[selector];
    const components = findAllDomShadow(selector);
    const inventoryData = updateInventory(componentName, components);

    if (inventoryData.length > 0) {
      if (!inventory.all[componentName]) {
        inventory.uniqueCount += 1; // add to the unique count
        inventory.all[componentName] = inventoryData;
      } else {
        inventory.all[componentName].concat(inventoryData);
      }

      inventory.totalCount += inventoryData.length; // add to the total count
    }
  }

  return inventory;
}

function updateInventory(componentName, components) {
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
