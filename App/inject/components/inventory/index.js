import { settings } from 'carbon-components';
import { sendMessage, getMessage, storageChanged } from '../../../utilities';
import { allComponents } from '../../../globals';

const { prefix } = settings;
const idselector = 'bxdevid'; // should this be in prefix selector file?
// const html = document.querySelector('html');

function initInventory () {
    getMessage((msg, sender, sendResponse) => {
        if (msg.requestInventory) {
            sendMessage({ inventoryData: getInventory(allComponents) }, () => {
                console.log('message sent'); // TODO: remove this
            });
        }
    });
}

function randomID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getInventory (componentList) {
    const selectors = Object.keys(componentList);
    const inventory = {
        totalCount: 0,
        uniqueCount: 0,
        all: {}
    };
    
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
                component.dataset[idselector] = uniqueID; // set a unique id to find later

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