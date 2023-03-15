function activeTab(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) =>
    callback(tabs[0])
  );
}

async function activeTabAsync() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

export { activeTab, activeTabAsync };
