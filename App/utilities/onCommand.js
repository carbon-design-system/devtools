function onCommand (callback) {
    chrome.commands.onCommand.addListener(callback);
}

export { onCommand };