import { breakpoints, rem } from '@carbon/layout';

function getActiveBreakpoint(width) {
  const breakpointKeys = Object.keys(breakpoints);
  let breakpointName,
    breakpoint,
    windowWidth = rem(window.innerWidth),
    states = {
      before: [],
      after: [],
    };

  if (width) {
    windowWidth = rem(width);
  }

  for (let i = 0; i < breakpointKeys.length; i++) {
    breakpointName = breakpointKeys[i];
    breakpoint = breakpoints[breakpointName];

    // AND breakpoint width is less than window width
    if (parseInt(breakpoint.width, 10) <= parseInt(windowWidth, 10)) {
      states.before.push(breakpointName);
      states.active = breakpointName;
    } else {
      states.after.push(breakpointName);
    }
  }

  states.before.pop();

  return states;
}

export { getActiveBreakpoint };
