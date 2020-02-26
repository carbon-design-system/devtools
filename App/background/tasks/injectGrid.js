import { getMessage, insertScript, insertCSS } from '../../utilities';

// prevent multiple inserts

function injectGrid () {
    getMessage((request) => {
        if (request.runningCarbon === true) {
            insertScript('/static/inject/index.js');
            insertCSS('/static/inject/index.css');
        }
    });
}

export { injectGrid };