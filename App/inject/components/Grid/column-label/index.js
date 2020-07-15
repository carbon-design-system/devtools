import { settings } from 'carbon-components';
import { storageTrueFalse } from '../../../../utilities';
import { carbonPrefix } from '../../../../globals';
import { isHeader } from './isHeader';

const { prefix } = settings;

function manageColumnLabel (result) {
    const html = document.querySelector('html');

    // toggle on or off column identifier by hover
    storageTrueFalse(result.toggle2xHoverState, () => {
        html.classList.add(`${prefix}--grid--hover`);
    }, () => {
        html.classList.remove(`${prefix}--grid--hover`);
    });
}

function labelInjector () {
    const body = document.querySelector('body');
    const columns = document.querySelectorAll(`[class*="${carbonPrefix}--col"]`);
    
    injectLabels(columns, true); // initial injection

    const DOMwatch = new MutationObserver(mutationList => {
        mutationList.forEach(mutation => {
            if (mutation.type === 'childList') {
                injectLabels(mutation.addedNodes); // inject if anymore are added
                isHeader();
            }
        });
    });
    
    DOMwatch.observe(body, {
        childList: true,
        attributes: false,
        subtree: true
    });
}

function injectLabels (nodes, pure) {
    nodes.forEach((node) => {
        if (node.nodeType === 1) {
            const classes = node.getAttribute("class");
            const labelClassName = `${prefix}--label-column`;

            // don't keep looking if we know we have everything
            if (!pure) {
                const columns = node.querySelectorAll(`[class*="${carbonPrefix}--col"]`);
                
                if (columns.length === 0) {
                    return null; // kill function and do nothing
                }
                
                injectLabels(columns, true); // restart looking at found children
            }
            
            if (classes && classes.indexOf(`${carbonPrefix}--col`) > -1) {
                let label = node.querySelector(`.${labelClassName}`);
                
                if (!label) {
                    // add label if it doesn't already exist
                    label = document.createElement('div');
                    label.classList.add(labelClassName);
                    node.append(label);
                }
            }
        }
    });
}

export { manageColumnLabel, labelInjector, injectLabels };