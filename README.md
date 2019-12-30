# asynchooks-examples

Examples of async_hooks with Node.js v12.13.0.

## Usage

You need Node.js v12.13.0.

```
$ node -v

v12.13.0
```

Run ``index_*.js`` files directory with node. Some code requires ``--expose-gc`` to call ``global.gc();``.

```
$ node index_setTimeout.js

$ node index_setInterval.js

$ node --expose-gc index_promise.js
```
