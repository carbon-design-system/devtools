function storageChanged (callback) {
    chrome.storage.onChanged.addListener(callback);
}

export { storageChanged };