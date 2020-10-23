function insertCSS (tabId, details, callback) {
    chrome.tabs.insertCSS(tabId, details, callback);
}

export { insertCSS };