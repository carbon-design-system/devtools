function insertScript(tabId, details, callback) {
  chrome.tabs.executeScript(tabId, details, callback);
}

export { insertScript };
