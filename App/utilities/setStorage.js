function setStorage (data) {
    if (chrome && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set(data);
    }
}

export { setStorage };