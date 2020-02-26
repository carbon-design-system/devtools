import { settings } from 'carbon-components';
import { storageTrueFalse } from '../../../../utilities';

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

export { manageColumnLabel };