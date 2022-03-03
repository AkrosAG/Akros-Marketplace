const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');
const os = require('os');

// get library path
const path = resolve(__dirname, '../webcomponents/');

fs.readdirSync(path).forEach(function (mod) {
  const modPath = join(path, mod);

  // ensure path has package.json
  if (!fs.existsSync(join(modPath, 'package.json'))) {
    return;
  }

  // npm binary based on OS
  const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

  // install folder
  cp.spawn(npmCmd, ['run', 'package', '--ignore-scripts'], {
    env: process.env,
    cwd: modPath,
    stdio: 'inherit',
  });
});
