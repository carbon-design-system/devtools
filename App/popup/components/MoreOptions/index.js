import React from "react";
import { settings } from 'carbon-components';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { gaNavigationEvent } from '../../../utilities';
import { bugs, repository } from '../../../../package.json';

const { prefix } = settings;

function MoreOptions () {
    
    return (
        <OverflowMenu
            onClick={() => gaNavigationEvent('toggle', 'settings-menu', 1)}
            className={`${prefix}--more-options`}
            flipped={true}
            menuOffsetFlip={menuBody => {
                // TODO: This is a temporary fix due to some odd bug in carbon/chrome that won't allow the getboundingclientrect to get a width. In return it won't render properly. This overrides that bit. Keep an eye on this.
                setTimeout(() => {
                    menuBody.style.left = 'auto';
                    menuBody.style.right = 0;
                }, 0);
            }}
            ariaLabel="More options">
            <OverflowMenuItem
                primaryFocus={true} //
                isDelete={true}
                hasDivider={false}
                href={bugs.url}
                target="_blank"
                itemText="Report an issue"
                onClick={() => gaNavigationEvent('click', 'report-an-issue')}
            />
            <OverflowMenuItem
                hasDivider={false}
                href={repository.url}
                target="_blank"
                itemText="Go to GitHub"
                onClick={() => gaNavigationEvent('click', 'go-to-github')}
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

    gaNavigationEvent('click', 'settings')
}

export { MoreOptions };