/*
 * https://nodejs.org/dist/latest-v12.x/docs/api/async_hooks.html#async_hooks_public_api
 */

const async_hooks = require('async_hooks');

// Return the ID of the current execution context.
const eid = async_hooks.executionAsyncId();

// Return the ID of the handle responsible for triggering the callback of the
// current execution scope to call.
const tid = async_hooks.triggerAsyncId();

// Create a new AsyncHook instance. All of these callbacks are optional.
const asyncHook = async_hooks.createHook({
  init,
  before,
  after,
  destroy,
  promiseResolve,
});

// Allow callbacks of this AsyncHook instance to call. This is not an implicit
// action after running the constructor, and must be explicitly run to begin
// executing callbacks.
asyncHook.enable();

// Disable listening for new asynchronous events.
// asyncHook.disable();

//
// The following are the callbacks that can be passed to createHook().
//

// init is called during object construction. The resource may not have
// completed construction when this callback runs, therefore all fields of the
// resource referenced by "asyncId" may not have been populated.
function init(asyncId, type, triggerAsyncId, resource) {
  // Promise による callback task 登録の場合、Promise オブジェクト自身が来るので、参照保持すると GC されなくなる.
  arguments[3] = resource.constructor.name === 'PromiseWrap' ? resource.toString() : resource;

  historyInit.push(arguments);
}

// Before is called just before the resource's callback is called. It can be
// called 0-N times for handles (e.g. TCPWrap), and will be called exactly 1
// time for requests (e.g. FSReqCallback).
function before(asyncId) {
  historyBefore.push(asyncId);
}

// After is called just after the resource's callback has finished.
function after(asyncId) {
  historyAfter.push(asyncId);
}

// Destroy is called when an AsyncWrap instance is destroyed.
function destroy(asyncId) {
  historyDestroy.push(asyncId);
}

// promiseResolve is called only for promise resources, when the
// `resolve` function passed to the `Promise` constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) {
  historyPromiseResolve.push(asyncId);
}

//
// module.exports.
//

const historyInit = [];
const historyBefore = [];
const historyAfter = [];
const historyDestroy = [];
const historyPromiseResolve = [];

/**
 * async_hooks で取得した非同期呼び出しの履歴を表示します.
 */
module.exports = function () {
  // 表示処理が呼出元とは異なる event task として実行される様、setTimeout する. (event queue に入れておく)
  setTimeout(function printHistory() {
    const [init, before, after, destroy]
      = [[...historyInit], [...historyBefore], [...historyAfter], [...historyDestroy]];

    console.log('FirstExecutionAsyncId: ', eid, '\n');
    console.log('async_hook calls: init: ', init, '\n');
    console.log('async_hook calls: before: ', before, '\n');
    console.log('async_hook calls: after: ', after, '\n');
    console.log('async_hook calls: destroy: ', destroy, '\n');
  }, 10);
}
