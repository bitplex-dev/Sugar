import { getMatcher } from '../util/matchers';
import { assertArray } from '../util/assertions';
import { forEachSparse } from '../util/array';

/**
 * Counts elements in the array.
 *
 * @param {Array} arr - The array.
 * @param {any|searchFn} match - A matcher to determine elements that will be
 * counted. When a function is passed a truthy return value will match the
 * element. Primitives will directly match elements. Can also be a Date object
 * to match dates, a RegExp which will test against strings, or a plain object
 * which will perform a "fuzzy match" on specific properties. Values of a fuzzy
 * match can be any of the matcher types listed above.
 *
 * @returns {number}
 *
 * @example
 *
 *   ['a','b','a'].count('a') -> 2
 *   ['a','b','c'].count(/b/) -> 1
 *   users.count(function(user) {
 *     return user.age > 30;
 *   }); -> number of users older than 30
 *
 **/
export default function count(arr, match) {
  assertArray(arr);
  if (arguments.length === 1) {
    return arr.length;
  }
  let count = 0;
  const matcher = getMatcher(match);
  forEachSparse(arr, (el, i) => {
    if (matcher(arr[i], i, arr)) {
      count += 1;
    }
  });
  return count;
}
