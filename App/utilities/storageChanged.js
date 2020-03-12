function storageChanged (key, callback) {
    chrome.storage.onChanged.addListener(data => {
        if (data && data[key] && data[key].newValue) {
            callback(data[key].newValue);
        }
    });
}

export { storageChanged };