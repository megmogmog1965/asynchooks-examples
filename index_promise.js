const printHistory = require('./register-hook');

function _01_PromiseCallbackFunction (resolve, _) {
  resolve();
}

function _02_PromiseThenCallbackFunction (_) {
  // GC で Promise オブジェクトを破棄しないと "async_hooks.destroy" callback は呼ばれない.
  setTimeout(global.gc);

  printHistory();
}

new Promise(_01_PromiseCallbackFunction)
  .then(_02_PromiseThenCallbackFunction);
