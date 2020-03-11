function setStorage (data) {
    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set(data);
    }
}

export { setStorage };