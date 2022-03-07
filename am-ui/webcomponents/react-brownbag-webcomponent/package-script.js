const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
  const files = ['./dist/index.js'];
  await fs.ensureDir('../../src/assets/scripts/webcomponents');
  await concat(
    files,
    '../../src/assets/scripts/webcomponents/react-brownbag-webcomponent.js'
  );
};
build();
