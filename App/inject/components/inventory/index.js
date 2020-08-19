import { settings } from 'carbon-components';
import { positionTooltip, showHideTooltip, updateTooltipContent, addHighlight, removeHighlight } from '../';
import { sendMessage, getMessage, randomId } from '../../../utilities';
import { allComponents } from '../../../globals';

const { prefix } = settings;
const idselector = 'bxdevid'; // should this be in prefix selector file?

function initInventory () {
    getMessage((msg, sender, sendResponse) => {
        if (msg.requestInventory) {
            sendMessage({ inventoryData: getInventory(allComponents) });
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

function scrollIntoView (id) {
    const component = document.querySelector(`[data-${idselector}*="${id}"]`);
    const bodyRect = document.body.getBoundingClientRect();
    const componentRect = component.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let scrollToPosition = componentRect.top - bodyRect.top;
    
    if (componentRect.height < windowHeight) {
        // center it on the page if component height is less than window height
        scrollToPosition = scrollToPosition
                         - (windowHeight / 2) // centers basic position top on screen
                         + (componentRect.height / 2); // centers component on screen
    }

    if (componentRect.top < 0 || componentRect.bottom > windowHeight) {
        // avoid scrolling if fixed, or in view already
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    }
}

function highlightInventoryItems (ids) {
    doThisByIds(ids, highlightInventoryItem);
}

function removeInventoryHighlights (ids) {
    doThisByIds(ids, comp => removeHighlight(comp, 'inventory'));
    showHideTooltip(false);
}

function highlightInventoryItem (component, id, showTooltip) {
    addHighlight(component, 'inventory');

    if (showTooltip) {
        const idPosition = component.dataset[idselector].split(',').indexOf(id);
        const componentName = component.dataset.componentname.split(',')[idPosition];

        showHideTooltip(true);
        positionTooltip(component);
        updateTooltipContent(`
            <span class="${prefix}--tooltip--primary">${componentName}</span>
            <span class="${prefix}--tooltip--secondary">${component.offsetWidth}x${component.offsetHeight}</span>`);
    }
}

function doThisByIds (ids, callback) {
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

function resetIdSelectors () {
    const components = document.querySelectorAll(`[data-${idselector}]`);

    if (components.length === 1) {
        components[0].removeAttribute(`data-${idselector}`);
    } else if (components.length > 0) {
        for (let i = 0; i < components.length; i++) {
            components[i].removeAttribute(`data-${idselector}`);
        }
    }
}

function getInventory (componentList) {
    const selectors = Object.keys(componentList);
    const inventory = {
        totalCount: 0,
        uniqueCount: 0,
        all: {}
    };

    resetIdSelectors();
    
    for (let i = 0; i < selectors.length; i++) {
    // loop through indidivual selectors
        const selector = selectors[i];
        const componentName = componentList[selector];
        const components = document.querySelectorAll(selector);
        
        if (components.length > 0) {
        // if no components don't waste more time
            inventory.all[componentName] = [];
            inventory.uniqueCount += 1; // add to the unique count

            for (let i = 0; i < components.length; i++) {
            // loop through each component and build data, and assign ids
                const component = components[i];
                const uniqueID = randomId();
            
                inventory.totalCount += 1; // add to the total count
                
                if (component.dataset[idselector]) {
                    component.dataset[idselector] += ',' + uniqueID; // set a unique id to find later
                    component.dataset['componentname'] += ',' + componentName; // set a unique id to find later
                } else {
                    component.dataset[idselector] = uniqueID; // set a unique id to find later
                    component.dataset['componentname'] = componentName; // set a unique id to find later
                }

                inventory.all[componentName].push({
                    name: componentName,
                    uniqueID: uniqueID,
                    outerHTML: component.outerHTML,
                    innerText: component.innerText,
                    tag: component.localName,
                    id: component.id,
                    classes: component.classList.value.split(' ')
                });
            }
        }
    }
    
    return inventory;
}

export { initInventory };

// TODO: come up with a better name. more consistent. inventory, or audit?