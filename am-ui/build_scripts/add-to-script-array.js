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

const webcomponents = [];

fs.readdirSync(webcomponentsPath)
  .filter(file => {
    path.extname(file).toLowerCase() === EXTENSION;
  })
  .forEach(file => {
    const relativePath = path
      .relative('./', join(webcomponentsPath, file))
      .replace(/\\/g, '/');
    webcomponents.push(relativePath);
  });

const joinedScripts =
  angularConfig.projects[
    'marketplace-ui'
  ].architect.build.options.scripts.concat(webcomponents);

angularConfig.projects['marketplace-ui'].architect.build.options.scripts =
  joinedScripts;

fs.writeFileSync('./angular.json', JSON.stringify(angularConfig));
