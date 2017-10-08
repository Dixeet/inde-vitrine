'use strict';

/**
 * Created by robin on 08/10/17.
 */
var waitUtils = function waitUtils(timeout, cb) {
  if (typeof cb === 'function') {
    setTimeout(function () {
      return cb();
    }, timeout);
  } else {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, timeout);
    });
  }
};

var Utils = {
  wait: waitUtils
};