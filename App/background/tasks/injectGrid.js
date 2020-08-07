import { getMessage, insertScript, insertCSS } from '../../utilities';

// TODO: prevent multiple inserts

function injectGrid () {
    getMessage((msg, sender) => {
        if (msg.runningCarbon) {
            const frameId = msg.ignoreValidation ? 0: sender.frameId;
            
            insertScript(null, {
                file: '/static/inject/index.js',
                frameId: frameId
            });
            insertCSS(null, {
                file: '/static/inject/index.css',
                frameId: frameId
            });
        }
    });
}

export { injectGrid };