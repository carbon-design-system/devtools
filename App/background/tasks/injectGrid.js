import { getMessage, insertScript, insertCSS } from '../../utilities';

// TODO: prevent multiple inserts

function injectGrid () {
    getMessage((msg, sender) => {
        if (msg.runningCarbon === true) {
            insertScript(null, {
                file: '/static/inject/index.js',
                frameId: sender.frameId
            });
            insertCSS(null, {
                file: '/static/inject/index.css',
                frameId: sender.frameId
            });
        }
    });
}

export { injectGrid };