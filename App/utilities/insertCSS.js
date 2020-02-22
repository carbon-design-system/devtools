function insertCSS (filepath, callback) {
    chrome.tabs.insertCSS({
        file: filepath
    }, callback);
}

export { insertCSS };