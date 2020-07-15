import { getMessage, insertScript, insertCSS, activeTab } from '../../utilities';

// TODO: prevent multiple inserts

function injectGrid () {
    getMessage((msg, sender) => {
        if (msg.runningCarbon === true) {
            activeTab(tab => {
                insertScript(tab.id, {
                    file: '/static/inject/index.js',
                    frameId: sender.frameId
                });
                insertCSS(tab.id, {
                    file: '/static/inject/index.css',
                    frameId: sender.frameId
                });
            });
        }
    });
}

export { injectGrid };