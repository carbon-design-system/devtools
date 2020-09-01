import { breakpoints, rem } from '@carbon/layout';

function getActiveBreakpoint () {
    const breakpointKeys = Object.keys(breakpoints);
    const windowWidth = rem(window.innerWidth);
    let breakpointName, breakpoint,
        states = {
            before: [],
            after: []
        };

    for (let i = 0; i < breakpointKeys.length; i++) {
        breakpointName = breakpointKeys[i];
        breakpoint = breakpoints[breakpointName];

        // AND breakpoint width is less than window width
        if (parseInt(breakpoint.width, 10) <= parseInt(windowWidth, 10)) {
            states.before.push(breakpointName)
            states.active = breakpointName;
        } else {
            states.after.push(breakpointName);
        }
    }
    
    states.before.pop();

    return states;
}

export { getActiveBreakpoint };