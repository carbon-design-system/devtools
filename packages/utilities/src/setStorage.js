function setStorage(data, callback) {
  if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set(data, callback);
  }
}

export { setStorage };
