const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');
const os = require('os');

// get library path
const path = resolve(__dirname, '../webcomponents/');
const isProduction = process.argv[2] === '--prod';

fs.readdirSync(path).forEach(function (mod) {
  const modPath = join(path, mod);

  // ensure path has package.json
  if (!fs.existsSync(join(modPath, 'package.json'))) {
    return;
  }

  // npm binary based on OS
  const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

  if (isProduction) {
    console.log('##### Building components production! #####');
    cp.spawn(npmCmd, ['run', 'build:prod'], {
      env: process.env,
      cwd: modPath,
      stdio: 'inherit',
    });
  } else {
    console.log('##### Building components for dev! #####');
    cp.spawn(npmCmd, ['run', 'build'], {
      env: process.env,
      cwd: modPath,
      stdio: 'inherit',
    });
  }
});
