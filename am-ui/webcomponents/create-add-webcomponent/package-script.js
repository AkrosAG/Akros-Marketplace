const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = ['./dist/main.js'];
  await fs.ensureDir('../../src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../src/assets/scripts/webcomponents/create-add-webcomponent.js'
  );
};
build();
