import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import { insertScriptManifestV3 } from '@carbon/devtools-utilities/src/insertScript';
import { insertCSSManifestV3 } from '@carbon/devtools-utilities/src/insertCSS';
import { activeTabAsync } from '@carbon/devtools-utilities/src/activeTab';

function injectGrid() {
  getMessage(async (msg, sender) => {
    /* only inject if carbon is found
           and we haven't injected before */
    if (msg.runningCarbon && !msg.carbonDevtoolsInjected) {
      const frameId = msg.ignoreValidation ? 0 : sender.frameId;

      const { id: tabId } = await activeTabAsync();
      insertScriptManifestV3({
        files: ['/inject/index.js'],
        target: {
          frameIds: [frameId],
          tabId,
        },
      });

      if (process.env.NODE_ENV === 'production') {
        insertCSSManifestV3({
          files: ['/inject/index.css'],
          target: {
            frameIds: [frameId],
            tabId,
          },
        });
      }
    }
  });
}

export { injectGrid };
