import { settings } from 'carbon-components';
import {
  positionTooltip,
  showHideTooltip,
  updateTooltipContent,
  addHighlight,
  removeHighlight,
} from '../';
import { sendMessage, getMessage, randomId } from '@carbon/devtools-utilities';
import { allComponents } from '@carbon/devtools-token-server';

const { prefix } = settings;
const idselector = 'bxdevid'; // should this be in prefix selector file?
let inventory;

function initInventory() {
  getMessage((msg) => {
    if (msg.requestInventory) {
      sendMessage({ inventoryData: getInventory(allComponents) });

      // re-render if page updates
      const DOMwatch = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
          if (mutation.type === 'childList') {
            getInventory(allComponents, false);
            // do we need to send a message back to pop up
            // incase a component has been added or removed?s
          }
        });
      });

      DOMwatch.observe(document.body, {
        childList: true,
        attributes: false,
        subtree: true,
      });
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
  const component = document.querySelector(`[data-${idselector}*="${id}"]`);

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

function removeInventoryHighlights(ids) {
  doThisByIds(ids, (comp) => removeHighlight(comp, 'inventory'));
  showHideTooltip(false);
}

function highlightInventoryItem(component, id, showTooltip) {
  addHighlight(component, 'inventory');

  if (showTooltip) {
    const idPosition = component.dataset[idselector].split(',').indexOf(id);
    const componentName = component.dataset.componentname.split(',')[
      idPosition
    ];

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
  const components = document.querySelectorAll(selector);

  if (components.length === 1) {
    callback(components[0], ids[0], true);
  } else if (components.length > 0) {
    for (let i = 0; i < components.length; i++) {
      callback(components[i], ids[i], false);
    }
  }
}

function resetInventory() {
  const components = document.querySelectorAll(`[data-${idselector}]`);

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
    const components = document.querySelectorAll(selector);
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
          innerText: component.innerText,
          tag: component.localName,
          id: component.id,
          classes: component.classList.value.split(' '),
        });
      }
    }
  }

  return inventory;
}

export { initInventory };
