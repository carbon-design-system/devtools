function insertCSS(tabId, details, callback) {
  chrome.tabs.insertCSS(tabId, details, callback);
}

function insertCSSManifestV3(details, callback) {
  chrome.scripting.insertCSS(details, callback);
}

export { insertCSS, insertCSSManifestV3 };
