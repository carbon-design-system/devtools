import * as libraries from './libraries';
import { _initStats } from './helpers';

const { _stats, fail, success } = new _initStats();
const libraryKeys = Object.keys(libraries);
const _results = {
  totals: _stats,
};

libraryKeys.forEach((key) => {
  _results[key] = libraries[key]._stats;
  delete libraries[key]._stats;

  success(_results[key].success);
  fail(_results[key].fail);
});

console.log('component list results', _results.totals);

export { libraries, _results };
