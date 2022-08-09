const { prettylog, wrapper } = require('./helpers/pretty-log.js');

const log = (color, ...rest) => {
  const config = {
    color,
    dirname: __dirname,
    filename: __filename,
  };
  return wrapper('development', () => prettylog(config, ...rest));
};

const obj = {
  a: 1,
  b: 2,
  c: 'tres',
  d: 'cuatro',
  e: 'five',
  f: 'six',
};

log('red', 'Hola.', 'Log 1.', 'Red color.');
log('green', 'Hola.', 'Log 2.', 'Green color.');
log('blue', 'Hola.', 'Log 3.', 'Blue color.');

log('cyan', 'Object:', obj);
log('magenta', 'Array:', [1, 2, 3, 4]);
