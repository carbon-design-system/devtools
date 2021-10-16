import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

function formIBMRows(data) {
  const rows = [];

  const pageInfo = safeObj('page.pageInfo', data.digitalData);
  const owner = safeObj('ibm.owner', pageInfo);
  const producer = safeObj('ibm.contentProducer', pageInfo);
  const delivery = safeObj('ibm.contentDelivery', pageInfo);
  const version = safeObj('version', pageInfo);
  // const source = safeObj('source', pageInfo);

  if (owner) {
    rows.push({
      type: 'link',
      title: `Owner`,
      titleTitle: `digitalData.page.pageInfo.ibm.owner`,
      value: owner,
      href: `https://w3.ibm.com/#/results?page=people&q=${owner}`,
    });
  }

  if (producer) {
    rows.push({
      title: `Producer`,
      titleTitle: `digitalData.page.pageInfo.ibm.contentProducer`,
      value: producer,
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

  // source just duplicates content using the template below and the information above already displayed.
  // <version> DELIVERY:<contentDelivery> AUTHORING:<contentProducer>
  // if (source) {
  //   rows.push({
  //     title: `Source`,
  //     titleTitle: `digitalData.page.pageInfo.source`,
  //     value: source,
  //   });
  // }

  return rows;
}

export { formIBMRows };
