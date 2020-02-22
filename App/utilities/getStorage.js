function getStorage (key, callback) {
    chrome.storage.local.get(key, data => {
        if (key) {
            if (data && data[key]) {
                callback(data[key]);
            }
        } else if (key === null) {
            if (data) {
                callback(data);
            }
        }
    });
}

export { getStorage };