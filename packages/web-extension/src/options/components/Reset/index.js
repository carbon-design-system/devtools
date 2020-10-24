import React, { useState, useEffect } from 'react';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import { CheckmarkOutline16 } from '@carbon/icons-react';
import { configuration } from '../';

const { prefix } = settings;

function Reset({ settingKeys = [] }) {
  const [statusMsg, setStatusMsg] = useState(false);

  const resetSettings = () => {
    if (settingKeys.length) {
      chrome.storage.local.remove(settingKeys, (d) => {
        setStatusMsg(true);
      });

      configuration('general-reset');
    }
  };

  return (
    <div className={`${prefix}--options-reset ${prefix}--row`}>
      <div className={`${prefix}--col-sm-3`}>
        <h3 className={`${prefix}--options-reset__title`}>
          Are you sure you would like to reset all of your settings?
        </h3>
        <p className={`${prefix}--options-reset__helper`}>
          This includes all of the back end settings here in the extension
          options, and your defined configuration settings within main
          extension's popup window.
        </p>
        <p>
          <Button
            onClick={resetSettings}
            kind="danger"
            disabled={!Boolean(settingKeys.length)}>
            Clear all settings
          </Button>
        </p>
        {!statusMsg || Boolean(settingKeys.length) ? null : (
          <p className={`${prefix}--options-reset__status`}>
            <CheckmarkOutline16 /> Settings successfully reset!
          </p>
        )}
      </div>
    </div>
  );
}

export { Reset };
