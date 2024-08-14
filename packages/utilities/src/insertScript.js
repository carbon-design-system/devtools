function insertScriptManifestV3(details, callback) {
  chrome.scripting.executeScript(details, callback);
}

export { insertScriptManifestV3 };
