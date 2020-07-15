import { getMessage, insertScript, getStorage, onTabUpdated, storageChanged, activeTab } from '../../utilities';

// TODO: prevent multiple inserts



/// WHEN POP UP IS OPENED VALIDATE PAGE
function validatePage () {
    getMessage(msg => {
        if (msg.popup) {
            activeTab(tab => {
                insertValidation(tab.id);
            });
        }
    });
}

function insertValidation (tabId, callback) {
    insertScript(tabId, {
        file: '/static/validate/index.js',
        allFrames: true
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        } else if (typeof callback === 'function') {
            callback(tabId);
        }
    });
}

export { validatePage };