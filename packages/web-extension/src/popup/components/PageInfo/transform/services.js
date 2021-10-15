import { safeObj } from '@carbon/devtools-utilities/src/safeObj';

function formServicesRows(data) {
  const rows = [];
  const pageInfo = safeObj('page.pageInfo', data.digitalData);
  const services = safeObj('page.services', data.digitalData);

  Object.keys(services).forEach((serviceName) => {
    const service = services[serviceName];
    const servicePageInfo = pageInfo[serviceName];
    const enabled = '"enabled":true';

    if (
      service.enabled ||
      JSON.stringify(service).indexOf(enabled) > -1 ||
      (servicePageInfo && JSON.stringify(servicePageInfo).indexOf(enabled) > -1)
    ) {
      rows.push({
        title: serviceName,
        type: 'code',
        value: 'true',
      });
    }
  });

  return rows;
}

export { formServicesRows };
