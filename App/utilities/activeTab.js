// TODO: should I use this to set width?

function activeTab (callback) {
    chrome.tabs.query(
        {currentWindow: true, active : true},
        tabs => callback(tabs[0])
    );
}

export { activeTab };