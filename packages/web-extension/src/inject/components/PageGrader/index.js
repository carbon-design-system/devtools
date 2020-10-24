import { sendMessage, getMessage } from '@carbon/devtools-utilities';
import { thirdPartyGrade } from './thirdPartyGrade';
import { codeGrade } from './codeGrade';

function initPageGrade() {
  getMessage((msg) => {
    if (msg.requestPageGrade) {
      gradePage();
    }
  });
}

function gradePage() {
  let pageGrades = {};

  thirdPartyGrade(pageGrades);
  codeGrade(pageGrades);

  sendMessage({ pageGrades: pageGrades });

  return pageGrades;
}

export { initPageGrade };
