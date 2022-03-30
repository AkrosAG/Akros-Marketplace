const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = ['./dist/App.js'];
  await fs.ensureDir('../../src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../src/assets/scripts/webcomponents/search-results-webcomponent.js'
  );
  console.log('##### Finished packaging search-results-webcomponent! #####');
};
build();
