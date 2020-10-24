import { activeTab } from '../';

function sendMessage(msg, callback) {
  chrome.runtime.sendMessage(msg, callback);
}

function sendTabMessage(tabId, msg, callback) {
  if (tabId === -1) {
    activeTab((tab) => {
      chrome.tabs.sendMessage(tab.id, msg, callback);
    });
  } else {
    chrome.tabs.sendMessage(tabId, msg, callback);
  }
}

export { sendMessage, sendTabMessage };
