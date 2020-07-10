const iconColor = '#888D94';

function setBadge () {
    if (process.env.NODE_ENV === 'development') {
        chrome.browserAction.setBadgeText({text: 'DEV'});
        chrome.browserAction.setBadgeBackgroundColor({ color: iconColor });
    }
}

export { setBadge };