function formInventoryData(data) {
  if (!Object.keys(data).length) {
    return undefined;
  }

  const allComponents = {};
  const { _results, _totals, libraries } = data;

  if (libraries) {
    Object.keys(libraries).forEach((key) => {
      Object.assign(allComponents, libraries[key].components);
    });
  }

  return {
    _results,
    _totals,
    libraries,
    allComponents,
  };
}

export { formInventoryData };
