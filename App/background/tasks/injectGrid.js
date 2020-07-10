import { getMessage, insertScript, insertCSS, activeTab } from '../../utilities';

// TODO: prevent multiple inserts

function injectGrid () {
    getMessage(msg => {
        if (msg.runningCarbon === true) {
            activeTab(tab => {
                insertScript(tab.id, {
                    file: '/static/inject/index.js',
                    runAt: 'document_start'
                });
                insertCSS(tab.id, {
                    file: '/static/inject/index.css',
                    runAt: 'document_start'
                });
            });
        }
    });
}

export { injectGrid };