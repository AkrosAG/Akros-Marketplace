const angularConfig = require('../angular.json');
const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const path = require('path');

const scriptsPath = resolve(__dirname, '../src/assets/scripts');

const scripts = [];

fs.readdirSync(scriptsPath).forEach(file => {
  const relativePath = path.relative('./', join(scriptsPath, file));
  scripts.push(relativePath);
});

angularConfig.projects['marketplace-ui'].architect.build.options.scripts =
  scripts;

fs.writeFileSync('./angular.json', JSON.stringify(angularConfig));
