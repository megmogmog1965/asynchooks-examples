const printHistory = require('./register-hook');

let count = 0;

function _01_SetIntervalCallbackFunction() {
  if (++count > 10) {
    clearInterval(intervalID);
    printHistory();
  }
}

const intervalID = setInterval(_01_SetIntervalCallbackFunction, 10);
