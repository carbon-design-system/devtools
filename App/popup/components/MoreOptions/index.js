import React from "react";
import { settings } from 'carbon-components';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { bugs, repository } from '../../../../package.json'

const { prefix } = settings;

function MoreOptions () {
    
    return (
        <OverflowMenu
            className={`${prefix}--more-options`}
            flipped={true}
            ariaLabel="More options">
            <OverflowMenuItem
                primaryFocus={true}
                isDelete={true}
                hasDivider={false}
                href={bugs.url}
                target="_blank"
                itemText="Report an issue"
            />
            <OverflowMenuItem
                hasDivider={false}
                href={repository.url}
                target="_blank"
                itemText="Go to GitHub"
            />
            <OverflowMenuItem
                onClick={openChromeExtensionOptions}
                hasDivider={true}
                itemText="Settings"
            />
        </OverflowMenu>
    );
}

function openChromeExtensionOptions (e) {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}

export { MoreOptions };