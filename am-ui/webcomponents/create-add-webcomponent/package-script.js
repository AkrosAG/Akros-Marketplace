const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = [
    './dist/create-add-webcomponent/main.js',
    './dist/create-add-webcomponent/polyfills.js',
    './dist/create-add-webcomponent/runtime.js',
  ];
  await fs.ensureDir('../../src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../src/assets/scripts/webcomponents/create-add-webcomponent.js'
  );
  console.log('##### Finished packaging create-add-webcomponent! #####');
};
build();
