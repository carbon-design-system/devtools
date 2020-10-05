


let northstar = false;

function thirdPartyGrade (pageGrades = {}) {
    let grades = {};

    northstarCheck(grades) 
    jqueryCheck(grades);
    
    pageGrades.thirdParty = grades;
    
    return pageGrades;
}

function northstarCheck (grades = {}) {
    grades.northstar = {
        errorMsg: {
            title: 'Northstar found',
            msg: 'Northstar has been replaced by the IBM.com Library, and teams should be migrating away from using it.',
            link: {
                text: 'Learn more at IBM.com Library',
                url: 'https://www.ibm.com/standards/web/ibm-dotcom-library/'
            }
        },
        fail: 0,
        score: 1,
        weight: 1.5
    };
    
    const refs = document.querySelectorAll(`
        script[src*="1.www.s81c.com/common/"][src*="/js/www.js"],
        link[href*="1.www.s81c.com/common/"][href*="/css/www.css"]
    `);
    
    if (refs.length > 0) {
        grades.northstar.score = 0;
        northstar = true;
    }
    
    return grades;
}

function jqueryCheck (grades = {}) {
    grades.jquery =  {
        errorMsg: {
            title: 'jQuery found',
            msg: 'jQuery isn\'t needed anymore, and Carbon has intentionally steared away from being dependent on it.',
            link: {
                text: 'You might not need jQuery',
                url: 'http://youmightnotneedjquery.com/'
            }
        },
        fail: 0,
        score: 1,
        weight: 1
    };

    if (northstar || window.$ || window.jQuery || window.jquery) {
        grades.jquery.score = 0;
    }
    
    return grades;
}

function bootstrapCheck (grades = {}) {
    // bootstrap
    
}

function materialCheck (grades = {}) {
    // material design 
    
}

function lightningCheck (grades = {}) {
    // lightning design system
    
}

export {
    thirdPartyGrade,
    northstarCheck,
    jqueryCheck,
    bootstrapCheck,
    materialCheck,
    lightningCheck
};