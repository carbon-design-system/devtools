import { getMessage, insertScript } from '../../utilities';

// prevent multiple inserts

function validatePage () {
    getMessage((request, sender, sendResponse) => {
        if (request.popup === true) {
            insertScript('/static/validate/index.js');
        }
    });
}

export { validatePage };