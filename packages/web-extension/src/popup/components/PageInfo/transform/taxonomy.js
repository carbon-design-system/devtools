import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

function formTaxonomyRows(data) {
  // https://w3.ibm.com/w3publisher/digital-behavior-data-management/digital-registry/url-management
  const rows = [];
  const pageInfoIBM = safeObj('page.pageInfo.ibm', data.digitalData);
  const category = safeObj('page.category', data.digitalData);
  const siteID = pageInfoIBM.siteID || pageInfoIBM.siteId;
  const ibmKeys = category.ibm && Object.keys(category.ibm);
  const contentCategory = category.cmContentCategory;
  const primaryCategory = category.primaryCategory;
  const primaryCategoryName = category.primaryCategoryName;

  // other considerations, industry, country, subject, type

  if (siteID) {
    rows.push({
      title: 'siteID',
      titleTitle: `digitalData.page.pageInfo.ibm.siteID`,
      type: 'code',
      value: siteID,
    });
  }

  if (contentCategory) {
    rows.push({
      title: 'Content',
      titleTitle: 'Content category',
      type: 'code',
      value: contentCategory,
    });
  }

  if (primaryCategory) {
    // http://pokgsa.ibm.com/gsa/pokgsa/projects/t/tmtprojtest/tvm_prod/html/page_category.html
    rows.push({
      title: 'Page',
      titleTitle: 'Page category',
      type: 'code',
      value: primaryCategory,
      valueTitle: primaryCategoryName || primaryCategory,
    });
  }

  if (ibmKeys && ibmKeys.length) {
    ibmKeys.forEach((key) => {
      if (key.indexOf('ut') === 0 && key.indexOf('Name') === -1) {
        rows.push({
          title: key,
          titleTitle: `digitalData.page.category.ibm.${key}`,
          type: 'code',
          value: category.ibm[key],
          valueTitle: category.ibm[key + 'Name'],
        });
      }
    });
  }

  return rows;
}

export { formTaxonomyRows };
