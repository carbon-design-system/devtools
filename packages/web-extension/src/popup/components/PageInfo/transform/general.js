function formGeneralRows(data) {
  const rows = [];

  if (data.title) {
    rows.push({
      layout: 'full',
      title: 'Title',
      value: data.title,
    });
  }

  if (data.description) {
    rows.push({
      layout: 'full',
      title: 'Description',
      value: data.description,
    });
  }

  if (data.keywords && data.keywords.length) {
    rows.push({
      layout: 'full',
      title: `Keyword${data.keywords.length > 1 ? 's' : ''}`,
      type: 'code',
      value: data.keywords,
    });
  }

  if (data.location) {
    rows.push({
      layout: 'full',
      title: `URL`,
      type: 'link',
      value: data.location.origin + data.location.pathname,
      href: data.location.href,
    });
  }

  if (data.language) {
    rows.push({
      title: `Language`,
      type: 'code',
      value: data.language,
    });
  }

  return rows;
}

export { formGeneralRows };
