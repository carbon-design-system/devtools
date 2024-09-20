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
        files: ['src/inject/index.js'],
        target: {
          frameIds: [frameId],
          tabId,
        },
      });

      insertCSSManifestV3({
        files: ['src/inject/index.css'],
        target: {
          frameIds: [frameId],
          tabId,
        },
      });
    }
  });
}

export { injectGrid };
