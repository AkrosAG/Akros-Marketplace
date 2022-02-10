const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = [
    './dist/search-webcomponent/main.js',
    './dist/search-webcomponent/polyfills.js',
    './dist/search-webcomponent/runtime.js',
  ];
  await fs.ensureDir('../../am-ui/src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../am-ui/src/assets/scripts/webcomponents/search-webcomponent.js'
  );
};
build();
