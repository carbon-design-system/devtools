function formGeneralRows(data) {
  const rows = [];

  if (data.title) {
    rows.push({
      title: 'Title',
      value: data.title,
    });
  }

  if (data.description) {
    rows.push({
      title: 'Description',
      value: data.description,
    });
  }

  if (data.keywords && data.keywords.length) {
    rows.push({
      title: `Keyword${data.keywords.length > 1 ? 's' : ''}`,
      type: 'code',
      value: data.keywords,
    });
  }

  if (data.location) {
    rows.push({
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
