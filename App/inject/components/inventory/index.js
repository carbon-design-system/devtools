import { settings } from 'carbon-components';
import { sendMessage, getMessage } from '../../../utilities';
import { allComponents } from '../../../globals';

const { prefix } = settings;
const idselector = 'bxdevid'; // should this be in prefix selector file?
// const html = document.querySelector('html');
const highlightClass = `${prefix}--inventory--highlight`;

function initInventory () {
    getMessage((msg, sender, sendResponse) => {
        if (msg.requestInventory) {
            sendMessage({ inventoryData: getInventory(allComponents) });
        }

        if (msg.inventoryComponentMouseOut) {
            // remove all highlights when mouse out
            removeHighlights(msg.inventoryComponentMouseOut);
        }

        if (msg.inventoryComponentMouseOver) {
            // highlight each in list
            addHighlights(msg.inventoryComponentMouseOver);
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

function addHighlights (ids) {
    doThisByIds(ids, component => {
        component.classList.add(highlightClass);
    });
    
    // add window event listener
    document.body.addEventListener('mouseenter', nukeAllHighlights);
}

function removeHighlights (ids) {
    doThisByIds(ids, component => {
        component.classList.remove(highlightClass);
    });

    // remove window event listener
    document.body.removeEventListener('mouseenter', nukeAllHighlights);
}

function nukeAllHighlights () {
    const components = document.querySelectorAll('.' + highlightClass);
    
    components.forEach(component => {
        component.classList.remove(highlightClass);
    });
    
    document.body.removeEventListener('mouseenter', nukeAllHighlights);
}

function doThisByIds (ids, callback, afterCallback) {
    const beginning = `[data-${idselector}*="`;
    const end = `"]`;
    const selector = beginning + ids.join(end + ', ' + beginning) + end;
    const components = document.querySelectorAll(selector);

    if (components.length === 1) {
        callback(components[0]);
    } else if (components.length > 0) {
        for (let i = 0; i < components.length; i++) {
            callback(components[i]);
        }
    }
    
    if (typeof afterCallback === 'function') {
        afterCallback(ids);
    }
}

function randomID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
                const uniqueID = randomID();
            
                inventory.totalCount += 1; // add to the total count
                
                if (component.dataset[idselector]) {
                    component.dataset[idselector] += ',' + uniqueID; // set a unique id to find later
                } else {
                    component.dataset[idselector] = uniqueID; // set a unique id to find later
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