import { settings } from 'carbon-components';
import { carbonPrefix } from '../../../utilities';

const { prefix } = settings;

function isHeader () {
    const html = document.querySelector(`html`);
    const header = html.querySelector(`.${carbonPrefix}--header`);
    console.log('hello');
    console.log(html, header);
    if (header) {
        html.classList.add(`${prefix}--header`);
    }
}

export { isHeader };