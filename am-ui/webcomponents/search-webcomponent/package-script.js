const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = [
    './dist/search-webcomponent/main.js',
    './dist/search-webcomponent/polyfills.js',
    './dist/search-webcomponent/runtime.js',
  ];
  await fs.ensureDir('../../src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../src/assets/scripts/webcomponents/search-webcomponent.js'
  );
  console.log('##### Finished packaging search-webcomponent! #####');
};
build();
