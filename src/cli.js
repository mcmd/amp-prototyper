const {amplify} = require('./core');
const argv = require('minimist')(process.argv.slice(2));
const steps = require('../steps/default-steps.js')

function printUsage() {
  let usage = `
Usage: ./amp-prototyper [URL]

Required:
  URL\tURL to the page to convert.

Options:
  --steps=FILE\tPath to the custom steps JS file. If not defined, it will use ./steps/default-steps.js
  --output=FILE\tPath to the output file.
  --device=DEVICE_NAME\tUse specific device name for screenshots.
  --headless=(true|false)\tWhether to show browser.
  --verbose\tDisplay AMP validation errors.

Examples:
  # AMPlify a page and generate results in /output folder.
  ./amp-prototyper http://127.0.0.1:8080

  # AMPlify a page and generate results in /output/test folder.
  ./amp-prototyper http://127.0.0.1:8080 --output=test

  # AMPlify a page with customized steps.
  ./amp-prototyper http://127.0.0.1:8080 --steps=custom/mysteps.js

  # AMPlify a page and display AMP validation details.
  ./amp-prototyper http://127.0.0.1:8080 --verbose
  `;
  console.log(usage);
}

/**
 * Main CLI function.
 */
async function begin() {
  let url = argv['_'][0], output = argv['output'];
  let customSteps = argv['steps'] ?
      require(`../${argv['steps']}`) : null;

  if (!url) {
    printUsage();
    return;
  }

  let allSteps = customSteps || steps;
  if (customSteps) console.log(`Use custom steps ${argv['steps']}`);

  amplify(url, allSteps, argv);
}

module.exports = {
  begin,
};
