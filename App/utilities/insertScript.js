function insertScript (filepath, callback) {
    chrome.tabs.executeScript({
        file: filepath
    }, callback);
}

export { insertScript };