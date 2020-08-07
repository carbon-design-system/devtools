import { getMessage, insertScript, insertCSS } from '../../utilities';

function injectGrid () {
    getMessage((msg, sender) => {
        /* only inject if carbon is found
           and we haven't injected before */
        if (msg.runningCarbon && !msg.carbonDevtoolsInjected) {
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