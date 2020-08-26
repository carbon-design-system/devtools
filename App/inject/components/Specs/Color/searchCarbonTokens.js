import { prioritizeThemes } from './themeKeys';

/*
    as of right I can't be 100% sure I'm getting the correct token here on the
    theme side, but here are the steps I'm taking to make an educated guess.
    
    IDL Color Token (100%)
    1. search all IDL tokens until I find a match
    
    Carbon Theme
    1. check target and see if it has custom properties, and grab the
       used theme based on some checks around the unique list of keys.
       search based on that single theme if found.
    2. search through all themes if no active theme is found.
    3. scope tokens checked for based on types (e.g. type, background, border, icon)
    4. if a unique token is match, grab it's theme, and reorder the master list too
       prioritize that going forward. The thought process here is in general most pages use a single theme.
       If a theme has been identified then we can assume the next element will have a high chance it's using
       that same theme.
*/ 

function searchCarbonTokens (tokens, color, scopedKeys = [], base = '') {
    let tokenValue = false;

    if (typeof tokens === 'object' && !Array.isArray(tokens)) {
        // TODO: add capability to pass in an array?
        const keys = Object.keys(tokens);
        let key, token;

        for (let i = 0; i < keys.length; i += 1) {
            key = keys[i];
            token = tokens[key];
            
            if (scopedKeys.length === 0 || scopedKeys.indexOf(key) > -1) {
                // check if scopedkeys is defined.
                // if it's not continue to search everything.
                // if it is, only continue if key is part of the scoped list. 
                if (typeof token === 'string') {
                    // if it's a string we know we found the token value
                    if (token == color) {
                        // if token and color match
                        //   1. add to name,
                        //   2. return values, and
                        //   3. reorder theme list to make a better educated guess moving forward
                        //   4. break loop so we don't go looking anymore.
                        prioritizeThemes(key, base.split('-')[0]);

                        tokenValue = {
                            name: base + '-' + key, // token name
                            color: token
                        };

                        break; // break loop
                    }
                } else {
                    // if it's not a string let's recursively check the next object
                    tokenValue = searchCarbonTokens(token, color, scopedKeys, base + key);
                    
                    if (tokenValue) {
                        // if our search returned a result break the loop
                        break;
                    }
                }
            }
        }
    }
    
    return tokenValue;
}

export { searchCarbonTokens };