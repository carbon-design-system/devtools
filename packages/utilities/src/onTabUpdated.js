function onTabUpdated(callback) {
  chrome.tabs.onUpdated.addListener(callback);
}

export { onTabUpdated };
