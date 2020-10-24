function getMessage(callback) {
  chrome.runtime.onMessage.addListener(callback);
}

export { getMessage };
