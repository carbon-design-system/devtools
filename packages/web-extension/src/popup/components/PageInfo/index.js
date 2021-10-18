import React, { useState } from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from 'carbon-components-react/es/components/StructuredList';
import { InlineNotification } from 'carbon-components-react/es/components/Notification';
import Link from 'carbon-components-react/es/components/Link';
import CodeSnippet from 'carbon-components-react/es/components/CodeSnippet';
import Search from 'carbon-components-react/es/components/Search';
import {
  formGeneralRows,
  formIBMRows,
  formLibraryRows,
  formDateRows,
  formTaxonomyRows,
  formServicesRows,
} from './transform';

const { prefix } = settings;

function PageInfo({ initialMsg, _inventoryData }) {
  const groups = {};

  groups.general = {
    title: '',
    rows: formGeneralRows(initialMsg.pageInfo),
  };

  groups.ibm = {
    title: 'IBM',
    rows: formIBMRows(initialMsg.pageInfo),
  };

  groups.libraries = {
    title: 'Libraries',
    rows: formLibraryRows(initialMsg.pageInfo, _inventoryData),
  };

  groups.dates = {
    title: 'Dates',
    rows: formDateRows(initialMsg.pageInfo),
  };

  groups.taxonomy = {
    title: 'Taxonomy',
    rows: formTaxonomyRows(initialMsg.pageInfo),
  };

  groups.services = {
    title: 'Services',
    rows: formServicesRows(initialMsg.pageInfo),
  };

  const [filteredGroups, setFilteredGroups] = useState(groups);
  const [searchValue, setSearchValue] = useState('');

  function searchPageInfo(val) {
    val = val.toLowerCase().trim();

    const filteredGroupResults = JSON.parse(JSON.stringify(groups));

    if (val) {
      const groupKeys = Object.keys(groups);

      for (let i = 0; i < groupKeys.length; i++) {
        const groupKey = groupKeys[i];
        const group = filteredGroupResults[groupKey];

        group.rows = group.rows.filter(
          ({
            title = '',
            titleTitle = '',
            value = '',
            subtitle = '',
            subtitleTitle = '',
            href = '',
          }) => {
            const searchableValue = String(value);

            return (
              title.toLowerCase().indexOf(val) > -1 ||
              titleTitle.toLowerCase().indexOf(val) > -1 ||
              subtitle.toLowerCase().indexOf(val) > -1 ||
              subtitleTitle.toLowerCase().indexOf(val) > -1 ||
              href.toLowerCase().indexOf(val) > -1 ||
              searchableValue.toLowerCase().indexOf(val) > -1
            );
          }
        );

        if (!group.rows.length) {
          delete filteredGroupResults[groupKey];
        }
      }
    }

    setFilteredGroups(filteredGroupResults);
    setSearchValue(val);
  }

  return (
    <div className={`${prefix}--row ${prefix}--page-info`}>
      {handleErrors(initialMsg.pageInfo)}
      <Search
        onChange={(e) => searchPageInfo(e.target.value, e)}
        className={`${prefix}--page-info__search`}
        placeholder="Search page info"
      />
      {Object.keys(filteredGroups).length
        ? Object.keys(filteredGroups).map((groupKey) => {
            const group = filteredGroups[groupKey];

            if (group.rows.length) {
              return renderGroup(group.title, group.rows);
            }
          })
        : emptyState(searchValue)}
    </div>
  );
}

function emptyState(val) {
  return (
    <div className={`${prefix}--col ${prefix}--page-info__empty`}>
      <p>
        {`Sorry, this page doesn't have information matching “`}
        <span>{val.trim()}</span>
        {`”.`}
      </p>
    </div>
  );
}

function renderGroup(groupTitle, rows) {
  return !rows.length ? null : (
    <StructuredListWrapper className={`${prefix}--page-info__group`}>
      {groupTitle ? (
        <StructuredListHead>
          <StructuredListRow head tabIndex={0}>
            <StructuredListCell
              className={`${prefix}--page-info__group-title`}
              head
            >
              {groupTitle}
            </StructuredListCell>
            <StructuredListCell></StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
      ) : null}
      <StructuredListBody>
        {rows.map((row) => (
          <StructuredListRow key={'row' + row.title} tabIndex={0}>
            <StructuredListCell>
              <p
                className={`${prefix}--page-info__row-title`}
                title={row.titleTitle || row.title}
              >
                {row.title}
              </p>
              {row.subtitle && (
                <p
                  className={`${prefix}--page-info__row-subtitle`}
                  title={row.subtitleTitle || row.subtitle}
                >
                  {row.subtitle}
                </p>
              )}
            </StructuredListCell>
            <StructuredListCell>
              <span
                title={row.valueTitle || row.value}
                className={`${prefix}--page-info__row-value`}
              >
                {renderByType(row)}
              </span>
            </StructuredListCell>
          </StructuredListRow>
        ))}
      </StructuredListBody>
    </StructuredListWrapper>
  );
}

function renderByType(row) {
  let values = Array.isArray(row.value) ? [...row.value] : [row.value];
  let key = 'value' + row.title;
  let formattedValue;

  switch (row.type) {
    case 'code':
      formattedValue = values.map((value) => (
        <CodeSnippet key={key + value} type="inline" hideCopyButton={true}>
          {String(value)}
        </CodeSnippet>
      ));
      break;
    case 'link':
      formattedValue = values.map((value) => (
        <Link key={key + value} href={row.href} target="_blank">
          {value}
        </Link>
      ));
      break;
    default:
      formattedValue = values.join(', ');
  }

  return formattedValue;
}

function handleErrors(data) {
  let errorMsg;
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

  // TODO: loop through digital data errors?
  // TODO: multiple errors?

  switch (true) {
    case !data.digitalData:
      errorMsg = errorMessages['digitalData'];
      break;
    case !data.digitalData.page:
      errorMsg = errorMessages['digitalData.page'];
      break;
    case !data.digitalData.page.pageInfo:
      errorMsg = errorMessages['digitalData.page.pageInfo'];
      break;
    case !data.digitalData.page.pageInfo.ibm:
      errorMsg = errorMessages['digitalData.page.pageInfo.ibm'];
      break;
    case !data.digitalData.page.category:
      errorMsg = errorMessages['digitalData.page.category'];
      break;
    case !data.digitalData.page.category.ibm:
      errorMsg = errorMessages['digitalData.page.category.ibm'];
      break;
    default:
      errorMsg = null;
  }

  return (
    errorMsg && (
      <InlineNotification
        {...errorMsg}
        className={`${prefix}--page-info__notification`}
        hideCloseButton={true}
      />
    )
  );
}

PageInfo.propTypes = {
  _inventoryData: PropTypes.object,
  initialMsg: PropTypes.object,
};

export { PageInfo };
