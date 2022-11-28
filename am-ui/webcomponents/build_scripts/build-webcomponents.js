const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const spawn = require('child_process').spawn;
const os = require('os');

// get library path
const path = resolve(__dirname, '../../webcomponents/');

fs.readdirSync(path).forEach(function (mod) {
  const modPath = join(path, mod);

  // ensure path has package.json
  if (!fs.existsSync(join(modPath, 'package.json'))) {
    return;
  }

  // npm binary based on OS
  const npmCmd = os.platform().startsWith('win') ? 'pnpm.cmd' : 'pnpm';
  const isProduction = process.argv[2] === '--prod';
  let cp;

  if (isProduction) {
    cp = spawn(npmCmd, ['build:prod'], {
      env: process.env,
      cwd: modPath,
      stdio: 'inherit',
    });
  } else {
    cp = spawn(npmCmd, ['build'], {
      env: process.env,
      cwd: modPath,
      stdio: 'inherit',
    });
  }
  cp.on('exit', (code, signal) => {
    if (code) {
      console.error('Child exited with code', code);
      throw new Error(code);
    } else if (signal) {
      console.error('Child was killed with signal', signal);
    } else {
      console.log('Child exited okay');
    }
  });
});
