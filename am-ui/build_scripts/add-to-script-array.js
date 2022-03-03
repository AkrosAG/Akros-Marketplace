const angularConfig = require('../angular.json');
const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const path = require('path');

const webcomponentsPath = resolve(
  __dirname,
  '../src/assets/scripts/webcomponents'
);

const EXTENSION = '.js';
const scriptFiles = [];
const webcomponents = [];

fs.readdirSync(webcomponentsPath).forEach(file => {
  if (path.extname(file).toLowerCase() === EXTENSION) {
    scriptFiles.push(file);
  }
});

scriptFiles.forEach(script => {
  const relativePath = path
    .relative('./', join(webcomponentsPath, script))
    .replace(/\\/g, '/');
  webcomponents.push(relativePath);
});

const joinedScripts =
  angularConfig.projects[
    'marketplace-ui'
  ].architect.build.options.scripts.concat(webcomponents);

angularConfig.projects['marketplace-ui'].architect.build.options.scripts =
  joinedScripts;

fs.writeFileSync('./angular.json', JSON.stringify(angularConfig, null, 2));
