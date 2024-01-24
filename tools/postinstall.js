const FS = require('fs');
const Path = require('path');

// npm_config_platform exists only when nodejs-mobile is building our module
const platform = process.env['npm_config_platform'];

// On iOS nodejs-mobile we need index.node to be a folder that
// will be converted to a .framework
const projectRoot = Path.join(__dirname, '..');
const outputPath = Path.join(projectRoot, 'index.node');
const tempPath = Path.join(projectRoot, 'index.node.tmp');
if (platform === 'ios' && FS.existsSync(outputPath)) {
  FS.renameSync(outputPath, tempPath);
  FS.mkdirSync(outputPath);
  FS.renameSync(tempPath, Path.join(outputPath, 'index'));
}
