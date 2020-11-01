import {
  isArray,
  isObject,
  isDate,
  isRegExp,
  isFunction,
  isPrimitive,
} from './typeChecks';
import { memoize } from './caching';
import { forEachProperty } from './helpers';

export function getMatcher(arg, context) {
  if (!isPrimitive(arg)) {
    if (isRegExp(arg)) {
      return getRegexMatcher(arg);
    } else if (isDate(arg)) {
      return getDateMatcher(arg);
    } else if (isFunction(arg)) {
      return getFunctionMatcher(arg, context);
    } else {
      return getFuzzyMatcher(arg);
    }
  }
  return getDefaultMatcher(arg);
}

function getRegexMatcher(reg) {
  return (val) => {
    return reg.test(val);
  };
}

function getDateMatcher(date) {
  const time = date.getTime();
  return (val) => {
    return isDate(val) && val.getTime() == time;
  };
}

function getFunctionMatcher(fn, context) {
  return (val, key, obj) => {
    // Return true up front if match by reference
    if (val === fn) {
      return true;
    } else if (isArray(obj)) {
      return fn.call(context || obj, val, key, obj);
    } else {
      return fn.call(context || obj, key, val, obj);
    }
  };
}

function getDefaultMatcher(obj) {
  return (val) => {
    return val === obj;
  };
}

function getFuzzyMatcher(fuzzy) {
  const getMatcherForKey = memoize((key, val) => {
    return getMatcher(val);
  });
  return (val, key, obj) => {
    if (!isObject(val)) {
      return false;
    }
    let matched = true;
    forEachProperty(fuzzy, (mKey, mVal) => {
      const matcher = getMatcherForKey(mKey, mVal);
      if (matcher(val[mKey], mKey, obj) === false) {
        matched = false;
      }
      return matched;
    });
    return matched;
  };
}
