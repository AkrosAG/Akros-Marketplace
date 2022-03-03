const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = ['./dist/js/app.js', './dist/js/chunk-vendors.js'];
  await fs.ensureDir('../../src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../src/assets/scripts/webcomponents/vue-brownbag-webcomponent.js'
  );
};
build();
