// code up to date?
// additional or overidden CSS?
// total components found

import { prefixSelectors, allComponents } from '../../../globals';

function codeGrade(pageGrades = {}) {
  let grades = {};

  carbonCheck(grades);
  componentCheck(grades);

  pageGrades.code = grades;

  return pageGrades;
}

function carbonCheck(grades = {}) {
  grades.carbon = {
    errorMsg: {
      title: 'Carbon not found',
      msg: "To be Carbon compliant you must first be using carbon's components",
      link: {
        text: 'Learn more at Carbon',
        url: 'https://www.carbondesignsystem.com/',
      },
    },
    fail: 0,
    score: 1,
    weight: 1.5,
  };

  const refs = document.querySelectorAll(prefixSelectors);

  if (refs.length === 0) {
    grades.carbon.score = 0;
  }

  return grades;
}

function componentCheck(grades = {}) {
  grades.component = {
    errorMsg: {
      title: 'Less than 10 components found',
      msg:
        'There is no hard set value of how many components you can have on a page, but a good rule of thumb to aim for is 10.',
      link: {
        text: 'Learn more about Carbon components',
        url: 'https://www.carbondesignsystem.com/patterns/overview',
      },
    },
    fail: 0.5,
    score: 1,
    weight: 0.5,
  };

  const selectors = Object.keys(allComponents);
  const refs = [...document.querySelectorAll(selectors)].slice(0, 10);

  grades.component.score = refs.length / 10;

  return grades;
}

export { codeGrade, carbonCheck };
