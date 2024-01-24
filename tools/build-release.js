const Path = require('path');
const rimraf = require('rimraf');
const childProcess = require('child_process');
const package = require('../package.json');

if (process.env['DONT_COMPILE_NODE_ADDON']?.split(',').includes(package.name)) {
  return;
}

const projectRoot = Path.join(__dirname, '..');
const outputFile = Path.join(projectRoot, 'index.node');
const targetFolder = Path.join(projectRoot, 'target');

rimraf.sync(outputFile);
rimraf.sync(targetFolder);

const njCliBuild = childProcess.spawnSync(
  'nj-cli',
  ['build', '--release', '--out=.'],
  {stdio: 'inherit'},
);
if (njCliBuild.status !== 0) {
  process.exit(njCliBuild.status);
}
