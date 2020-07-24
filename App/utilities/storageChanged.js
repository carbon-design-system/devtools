function storageChanged (key, callback) {
    chrome.storage.onChanged.addListener(data => {
        if (data && data[key]) {
            callback(data[key].newValue);
        }
    });
}

export { storageChanged };