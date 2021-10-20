import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import Link from 'carbon-components-react/es/components/Link';
import { InlineNotification } from 'carbon-components-react/es/components/Notification';
import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

const { prefix } = settings;

function ValidationErrors({ data }) {
  let errorMsgs = [];

  const errorMessages = {
    digitalData: {
      kind: 'warning',
      title: 'Missing',
      subtitle: (
        <Link
          href="https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html"
          target="_blank"
        >
          digitalData
        </Link>
      ),
    },
    'digitalData.page': {
      kind: 'warning',
      title: 'Missing',
      subtitle: (
        <Link
          href="https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html#11-page-category"
          target="_blank"
        >
          digitalData.page
        </Link>
      ),
    },
    'digitalData.page.pageInfo': {
      kind: 'warning',
      title: 'Missing',
      subtitle: (
        <Link
          href="https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html#15-page-information"
          target="_blank"
        >
          digitalData.page.pageInfo
        </Link>
      ),
    },
    'digitalData.page.pageInfo.ibm': {
      kind: 'warning',
      title: 'Missing',
      subtitle: (
        <Link
          href="https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html#16-ibm-specific-page-information"
          target="_blank"
        >
          digitalData.page.pageInfo.ibm
        </Link>
      ),
    },
    'digitalData.page.category': {
      kind: 'warning',
      title: 'Missing',
      subtitle: (
        <Link
          href="https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html#11-page-category"
          target="_blank"
        >
          digitalData.page.category
        </Link>
      ),
    },
    'digitalData.page.category.ibm': {
      kind: 'warning',
      title: 'Missing',
      subtitle: (
        <Link
          href="https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html#12-global-brand-table-categories-for-page"
          target="_blank"
        >
          digitalData.page.category.ibm
        </Link>
      ),
    },
  };

  isNorthstar(data, errorMsgs);

  // TODO: loop through digital data errors?
  // TODO: multiple errors?

  switch (true) {
    case !safeObj('pageInfo.digitalData', data):
      errorMsgs.push(errorMessages['digitalData']);
      break;
    case !safeObj('pageInfo.digitalData.page', data):
      errorMsgs.push(errorMessages['digitalData.page']);
      break;
    case !safeObj('pageInfo.digitalData.page.pageInfo', data):
      errorMsgs.push(errorMessages['digitalData.page.pageInfo']);
      break;
    case !safeObj('pageInfo.digitalData.page.pageInfo.ibm', data):
      errorMsgs.push(errorMessages['digitalData.page.pageInfo.ibm']);
      break;
    case !safeObj('pageInfo.digitalData.page.category', data):
      errorMsgs.push(errorMessages['digitalData.page.category']);
      break;
    case !safeObj('pageInfo.digitalData.page.category.ibm', data):
      errorMsgs.push(errorMessages['digitalData.page.category.ibm']);
      break;
  }

  return !errorMsgs.length
    ? null
    : errorMsgs.map((errorMsg, i) => (
        <InlineNotification
          key={errorMsg.title + errorMsg.kind + i}
          {...errorMsg}
          className={`${prefix}--page-info__notification`}
          hideCloseButton={true}
        />
      ));
}

function isNorthstar(data, errorMsgs) {
  const northstar = safeObj('pageInfo.Northstar.numOfFiles', data);

  if (northstar) {
    errorMsgs.push({
      kind: 'warning',
      title: 'Found',
      subtitle: (
        <>
          <Link
            href="https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/about/"
            target="_blank"
          >
            Northstar
          </Link>
          {` in ${northstar} file${northstar > 1 ? 's' : ''}`}
        </>
      ),
    });
  }

  return errorMsgs;
}

ValidationErrors.propTypes = {
  data: PropTypes.object,
};

export { ValidationErrors };
