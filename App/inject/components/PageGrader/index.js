import { settings } from 'carbon-components';
import { sendMessage, getMessage } from '../../../utilities';
import { thirdPartyGrade } from './thirdPartyGrade';
import { codeGrade } from './codeGrade';

const { prefix } = settings;

function initPageGrade () {
    getMessage((msg, sender, sendResponse) => {
        if (msg.requestPageGrade) {
            gradePage();
        }
    });
}

function gradePage () {
    let pageGrades = {};
    
    thirdPartyGrade(pageGrades);
    codeGrade(pageGrades);

    sendMessage({ pageGrades: pageGrades });

    return pageGrades;
}


export { initPageGrade };