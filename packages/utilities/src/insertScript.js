function insertScript(tabId, details, callback) {
  chrome.tabs.executeScript(tabId, details, callback);
}

function insertScriptManifestV3(details, callback) {
  chrome.scripting.executeScript(details, callback);
}

export { insertScript, insertScriptManifestV3 };
