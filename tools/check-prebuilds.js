const fs = require('node:fs');
const path = require('node:path');
const exec = require('node:child_process').execSync;

const files = [
  ['prebuilds/android-arm/index.node', 'ELF 32-bit ARM'],
  ['prebuilds/android-arm64/index.node', 'ELF 64-bit ARM aarch64'],
  ['prebuilds/android-x64/index.node', 'ELF 64-bit x86-64'],
  ['prebuilds/ios-arm64/index.node/index', 'Mach-O 64-bit arm64'],
  ['prebuilds/ios-arm64-simulator/index.node/index', 'Mach-O 64-bit arm64'],
  ['prebuilds/ios-x64-simulator/index.node/index', 'Mach-O 64-bit x86_64'],
];

checkFiles: for (const [file, expected] of files) {
  // Check if file exists
  const parts = file.split('/');
  for (let i = 1; i < parts.length; i++) {
    const partialFilename = path.resolve(
      __dirname,
      '..',
      parts.slice(0, i).join('/'),
    );
    if (!fs.existsSync(partialFilename)) {
      console.error('Cannot npm publish with missing ' + file);
      continue checkFiles;
    }
  }
  if (!fs.existsSync(file)) {
    console.error('Cannot npm publish with missing ' + file);
    continue checkFiles;
  }

  // Check if file passes ELF or Mach-O test
  const output = exec(`file ${file}`).toString();
  const expectedWords = expected.split(' ');
  for (const expectedWord of expectedWords) {
    if (!output.includes(expectedWord)) {
      console.error(
        `Cannot npm publish with ${file} not matching ${expected}:\n${output}`,
      );
      continue checkFiles;
    }
  }
}
