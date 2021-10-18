function safeObj(path, scope) {
  if (!scope) {
    return false;
  }

  let context = scope;

  path = path.split('.');

  for (let i = 0; i < path.length; i++) {
    if (context[path[i]]) {
      context = context[path[i]];
    } else {
      context = false;
      break;
    }
  }

  return context;
}

export { safeObj };
