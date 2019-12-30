const printHistory = require('./register-hook');

function _01_SetTimeoutCallbackFunction() {
  printHistory();
}

setTimeout(_01_SetTimeoutCallbackFunction);
