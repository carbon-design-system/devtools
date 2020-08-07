import { getMessage, insertScript } from '../../utilities';

// TODO: prevent multiple inserts

// TODO: Can declarativeContent be used in place of validation scripts? https://developer.chrome.com/extensions/declarativeContent

/// WHEN POP UP IS OPENED VALIDATE PAGE
function validatePage () {
    getMessage(msg => {
        if (msg.popup) {
            insertValidation();
        }
    });
}

function insertValidation (callback) {
    insertScript(null, {
        file: '/static/validate/index.js',
        allFrames: true,
        matchAboutBlank: true
    }, () => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        } else if (typeof callback === 'function') {
            callback();
        }
    });
}

export { validatePage };