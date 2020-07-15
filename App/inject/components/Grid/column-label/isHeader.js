import { settings } from 'carbon-components';
import { carbonPrefix } from '../../../../globals';

const { prefix } = settings;

function isHeader () {
    const html = document.querySelector(`html`);
    const header = html.querySelector(`.${carbonPrefix}--header`);

    if (header) {
        html.classList.add(`${prefix}--header`);
    } else {
        html.classList.remove(`${prefix}--header`);
    }
}

export { isHeader };