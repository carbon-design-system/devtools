function sendMessage (msg, callback) {
    chrome.runtime.sendMessage(msg, callback);
}

export { sendMessage };