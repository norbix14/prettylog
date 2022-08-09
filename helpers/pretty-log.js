const path = require('path');
const os = require('os');

/**
 * Prints a message to the console using the given color.
 *
 * @param {object} config - Configuration object.
 * @param {string} config.color - Color of the message to be displayed.
 * @param {string} config.dirname - Current directory (__dirname).
 * @param {string} config.filename - Current file (__filename).
 * @param  {...any} rest - All parameters passed to the function.
 *
 * @example
 *
 * import { prettylog, wrapper } from './helpers/pretty-log.js';
 *
 * // Use a wrapper to simplify the use of prettylog
 * const log = (color, ...rest) => {
 *  const config = {
 *    color,
 *    dirname: __dirname,
 *    filename: __filename,
 *  };
 *  return wrapper(process.env.DEBUG_LOG, () => prettylog(config, ...rest));
 * };
 *
 * // Available colors: black, blue, cyan, gray, green, magenta, red, white, yellow.
 * // Default color: white.
 *
 * log('red', 'log1.', 'color red');
 * log('green', 'log2.', 'color green');
 * log('blue', 'log3.', 'color blue';
 * log('sky', 'log4.', 'color sky'; // print in white.
 *
 * // [index] (7:25:33 PM): log1. color red
 * // [index] (7:25:33 PM): log2. color green
 * // [index] (7:25:33 PM): log3. color blue
 * // [index] (7:25:33 PM): log4. color sky
 *
 */
const prettylog = (
  config = { color: null, dirname: null, filename: null },
  ...rest
) => {
  const colors = {
    black: '\x1b[30m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m',
    green: '\x1b[32m',
    magenta: '\x1b[35m',
    red: '\x1b[31m',
    reset: '\x1b[0m',
    white: '\x1b[37m',
    yellow: '\x1b[33m',
  };

  const OS = os.platform();
  const debugTime = new Date().toLocaleTimeString();

  const textColor = colors[config.color] || colors.white;
  let fileName, fileExtension, filenamePlain;

  if (config.dirname && config.filename) {
    if (OS === 'win32') {
      fileName = path.win32.basename(config.filename);
      fileExtension = path.win32.extname(fileName);
      filenamePlain = path.win32.basename(fileName, fileExtension);
    } else {
      fileName = path.basename(config.filename);
      fileExtension = path.extname(fileName);
      filenamePlain = path.basename(fileName, fileExtension);
    }
  } else {
    filenamePlain = '';
  }

  return console.log(
    textColor,
    `[${filenamePlain}] (${debugTime}):`,
    ...rest,
    colors.reset
  );
};

/**
 * Wrapper to use prettylog.
 *
 * @param {string} debug - Environment. If this value it's not valid or it's not 'development', the callback function will not be executed.
 * @param {function} callback - Callback function.
 *
 * @example
 * const { prettylog, wrapper } = require('./helpers/pretty-log.js');
 *
 * const log = (color, ...rest) => {
 *  const config = {
 *    color,
 *    dirname: __dirname,
 *    filename: __filename,
 *  };
 *  return wrapper(process.env.DEBUG_LOG, () => prettylog(config, ...rest));
 * };
 *
 */
const wrapper = (debug, callback) => {
  if (!debug || debug !== 'development') {
    return null;
  }
  return callback();
};

module.exports = {
  prettylog,
  wrapper,
};
