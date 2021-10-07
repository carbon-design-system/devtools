import { getMessage } from '@carbon/devtools-utilities/src/getMessage';
import { insertScript } from '@carbon/devtools-utilities/src/insertScript';
import { insertCSS } from '@carbon/devtools-utilities/src/insertCSS';

function injectGrid() {
  getMessage((msg, sender) => {
    /* only inject if carbon is found
           and we haven't injected before */
    if (msg.runningCarbon && !msg.carbonDevtoolsInjected) {
      const frameId = msg.ignoreValidation ? 0 : sender.frameId;

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
  });
}

export { injectGrid };
