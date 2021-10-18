import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

function formDateRows(data) {
  const rows = [];
  const pageInfo = safeObj('page.pageInfo', data.digitalData);
  const effectiveDate = safeObj('effectiveDate', pageInfo);
  const publishDate = safeObj('publishDate', pageInfo);
  const expiryDate = safeObj('expiryDate', pageInfo);

  if (publishDate) {
    rows.push({
      title: `Publish`,
      titleTitle: `digitalData.page.pageInfo.publishDate`,
      value: publishDate,
    });
  }

  if (effectiveDate) {
    rows.push({
      title: `Effective`,
      titleTitle: `digitalData.page.pageInfo.effectiveDate`,
      value: effectiveDate,
    });
  }

  if (expiryDate) {
    rows.push({
      title: `Expiration`,
      titleTitle: `digitalData.page.pageInfo.expiryDate`,
      value: expiryDate,
    });
  }

  return rows;
}

export { formDateRows };
