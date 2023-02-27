import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import {
  insertScript,
  insertScriptManifestV3,
} from '@carbon/devtools-utilities/src/insertScript';
import {
  insertCSS,
  insertCSSManifestV3,
} from '@carbon/devtools-utilities/src/insertCSS';
import { activeTabAsync } from '@carbon/devtools-utilities/src/activeTab';
import { isManifestV3 } from '@carbon/devtools-utilities/src/isManifestV3';

function injectGrid() {
  getMessage(async (msg, sender) => {
    /* only inject if carbon is found
           and we haven't injected before */
    if (msg.runningCarbon && !msg.carbonDevtoolsInjected) {
      const frameId = msg.ignoreValidation ? 0 : sender.frameId;

      if (isManifestV3()) {
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
      } else {
        insertScript(null, {
          file: '/inject/index.js',
          frameId: frameId,
        });

        if (process.env.NODE_ENV === 'production') {
          insertCSS(null, {
            file: '/inject/index.css',
            frameId: frameId,
          });
        }
      }
    }
  });
}

export { injectGrid };
