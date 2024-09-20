import { sendMessage } from '@carbon/devtools-utilities/src/sendMessage';
import { getStorage } from '@carbon/devtools-utilities/src/getStorage';
import { prefixSelectors } from '../globals/prefixSelectors';
import { bxDevGetLibraries } from "./validationScript";

bxDevGetLibraries();
sendValidation();
console.log('validation completed.');

function sendValidation() {
  const carbonComponents = document.querySelector(prefixSelectors);
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const title = document.querySelector('title');
  const description = document.querySelector('meta[name="description"]');
  const keywords = document.querySelector('meta[name="keywords"]');

  const pageInfo = {
    // do as much as we can here since this code is already injected, and to avoid larger stringifys in dataset attributes.
    title: title && title.innerText,
    description: description && description.getAttribute('content'),
    keywords:
      keywords &&
      keywords
        .getAttribute('content')
        .split(',')
        .map((keyword) => keyword.trim())
        .filter((k) => k),
    location: {
      domain: window.location.domain,
      host: window.location.host,
      hostname: window.location.hostname,
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      port: window.location.port,
      protocol: window.location.protocol,
      search: window.location.search,
      hash: window.location.hash,
    },
    language: html.getAttribute('lang'),
  };

  const msg = {
    windowWidth: window.outerWidth,
    carbonDevtoolsInjected: window.carbonDevtoolsInjected || false,
    pageInfo: {
      ...pageInfo,
      ...JSON.parse(body.dataset.pageInfo),
    },
  };

  delete body.dataset.pageInfo;

  getStorage(['generalNonCarbon'], ({ generalNonCarbon }) => {
    // at least components on page
    // or user chooses to ignore carbon validation
    if (generalNonCarbon || carbonComponents) {
      msg.runningCarbon = true;
      msg.ignoreValidation = generalNonCarbon;
    }

    sendMessage(msg);
  });
}
