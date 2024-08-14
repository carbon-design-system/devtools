function insertCSSManifestV3(details, callback) {
  chrome.scripting.insertCSS(details, callback);
}

export { insertCSSManifestV3 };
