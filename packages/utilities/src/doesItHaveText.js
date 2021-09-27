function doesItHaveText(children, target) {
  let validate = false;

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (
      child.nodeType == 3 &&
      child.wholeText.replace(/\n| /g, '').length > 0
    ) {
      validate = true;
    }

    if (validate) {
      break;
    }
  }

  if (!validate) {
    validate = checkInSlotsForText(target);
  }

  return validate;
}

function checkInSlotsForText(target) {
  const slots = target.querySelectorAll('slot');
  let validate = false;

  if (slots.length) {
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const children = slot.assignedNodes();

      validate = doesItHaveText(children, slot);

      if (validate) {
        break;
      }
    }
  }

  return validate;
}

export { doesItHaveText };
