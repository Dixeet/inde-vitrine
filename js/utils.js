/**
 * Created by robin on 08/10/17.
 */
const waitUtils = (timeout, cb) => {
  if(typeof cb === 'function'){
    setTimeout(() => cb(), timeout);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    })
  }
};

const Utils = {
  wait: waitUtils
};