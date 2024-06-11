import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import OverflowMenu from 'carbon-components-react/es/components/OverflowMenu';
import OverflowMenuItem from 'carbon-components-react/es/components/OverflowMenuItem';
import { openChromeExtensionOptions } from '@carbon/devtools-utilities/src/openChromeExtensionOptions';
import packageJSON from '../../../../package.json';

const { prefix } = settings;

function MoreOptions() {
  return (
    <OverflowMenu
      className={`${prefix}--more-options`}
      flipped={true}
      menuOffsetFlip={(menuBody) => {
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
        href={packageJSON.bugs.url}
        target="_blank"
        itemText="Report an issue"
      />
      <OverflowMenuItem
        hasDivider={false}
        href={packageJSON.repository.url}
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

export { MoreOptions };
