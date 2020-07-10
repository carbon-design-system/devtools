function onTabRemoved (callback) {
    chrome.tabs.onRemoved.addListener(callback);
}

export { onTabRemoved };