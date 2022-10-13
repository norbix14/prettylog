# Prettylog. Console colorizer

Useful to debug Javascript code or simply add a few colors to see where our code is
being executed.

Prints a message to the console using the color provided, the current directory and
the current name of the file where the code is being used.

Based on the environment variable `DEBUG_LOG`, the callback function will be called
or not. If this variable is set to `development`, the message will be displayed.

## Clone repository

```bash
gh repo clone norbix14/prettylog prettylog
```

```bash
git clone https://github.com/norbix14/prettylog.git prettylog
```

## Go to directory

```bash
cd prettylog
```

## Run example

```bash
node ./index.js
```

## How to use it in your own examples

```javascript
const { prettylog, wrapper } = require('./helpers/pretty-log.js');

const log = (color, ...rest) => {
  const config = {
    color,
    dirname: __dirname,
    filename: __filename,
  };
  return wrapper(process.env.DEBUG_LOG, () => prettylog(config, ...rest));
};

log('red', 'Param 1.', 'Param 2.');
log('green', 'Param 1.', 'Param 2.');
```

## Results (approximate)

```diff
- [parent][index] (7:25:33 PM): Param 1. Param 2.

+ [parent][index] (7:25:33 PM): Param 1. Param 2.
```
