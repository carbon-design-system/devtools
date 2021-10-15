import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

function formIBMRows(data) {
  const rows = [];

  const pageInfo = safeObj('page.pageInfo', data.digitalData);
  const owner = safeObj('ibm.owner', pageInfo);
  const contact = safeObj('ibm.contentProducer', pageInfo);
  const delivery = safeObj('ibm.contentDelivery', pageInfo);
  const source = safeObj('source', pageInfo);
  const version = safeObj('version', pageInfo);

  if (owner) {
    rows.push({
      title: `Owner`,
      titleTitle: `digitalData.page.pageInfo.ibm.owner`,
      value: owner,
    });
  }

  if (contact) {
    rows.push({
      type: 'link',
      title: `Contact`,
      titleTitle: `digitalData.page.pageInfo.ibm.contentProducer`,
      value: contact,
      href: `https://w3.ibm.com/#/results?page=people&q=${contact}`,
    });
  }

  if (delivery) {
    rows.push({
      title: `Delivery`,
      titleTitle: `digitalData.page.pageInfo.ibm.contentDelivery`,
      value: delivery,
    });
  }

  if (version) {
    rows.push({
      type: 'code',
      title: `Version`,
      titleTitle: `digitalData.page.pageInfo.version`,
      value: version,
    });
  }

  if (source) {
    rows.push({
      type: 'code',
      title: `Source`,
      titleTitle: `digitalData.page.pageInfo.source`,
      value: source,
    });
  }

  return rows;
}

export { formIBMRows };
