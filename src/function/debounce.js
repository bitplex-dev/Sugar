import { assertFunction, assertPositiveInteger } from '../util/assertions';

/**
 * Creates a "debounced" function that postpones its execution until
 * after `ms` milliseconds have passed. This method is useful to execute
 * a function after things have "settled down". A good example of this
 * is when a user tabs quickly through form fields, an action can be
 * taken once they have settled on a field.
 *
 * Note that this is similar to `throttle` with a limit of 1, with the
 * exception that a debounced function will receive the last arguments
 * supplied, while a throttled function will receive the first.
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} ms - The delay to debounce the function by. Default is `1`.
 *
 * @example
 *
 *   var fn = debounce(logHello, 250)
 *   runTenTimes(fn); -> called once 250ms later
 *
 * @returns {Function}
 *
 */
export default function debounce(fn, ms = 1) {
  assertFunction(fn);
  assertPositiveInteger(ms);

  let timer = null;
  let returnValue = null;

  const debounced = function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      returnValue = fn.apply(this, arguments);
    }, ms);
    return returnValue;
  };

  debounced.cancel = () => {
    clearTimeout(timer);
  };

  return debounced;
}
