function activeTab(callback) {
  chrome.tabs.query({ active: true }, (tabs) =>
    callback(tabs[0])
  );
}

async function activeTabAsync() {
  const tabs = await chrome.tabs.query({ active: true });
  return tabs[0];
}

export { activeTab, activeTabAsync };
