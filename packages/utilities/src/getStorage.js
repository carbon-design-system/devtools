function getStorage(key, callback) {
  chrome.storage.local.get(key, callback);
}

export { getStorage };
