function doesItHaveText(children, target) {
  let validate = false;
  // let children = target.childNodes;
  // console.log(target);
  //   if (target.shadowRoot) {
  //       target.querySelectorAll('slot').forEach(slot => {
  //           children = [...slot.assignedNodes()];
  //       });
  //   } else {
  //        children = [...];
  //   }
  // console.log(children);
  // console.log(children);
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    // console.log(child.nodeName);
    if (
      child.nodeType == 3 &&
      child.wholeText.replace(/\n| /g, '').length > 0
    ) {
      // console.log(child.wholeText.replace(/\n| /g, ''));
      validate = true;
    }
    // else if (child.shadowRoot) {
    // console.log('keep checking this childs children in the shadows', child.shadowRoot.childNodes)
    // validate = doesItHaveText(child.shadowRoot);
    // }

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
