const test = require('node:test');
const assert = require('node:assert');
const circomlibjs = require('circomlibjs');
const mod = require('../');
const nativeAddon = require('../index.node')

function hexToBigInt(hex) {
  return BigInt('0x' + hex);
}

const Ahex = 'deadbeef';
const Bhex = '12345678';
const Chex = 'abcdef01';
const X1hex = '149b6b5dff5c93c8a38545d6cc7f8a184b06ea786180e84c4693723599759ef5';
const X2hex = '2943ee1055ca037cf1babdcf9fac8576498f9edec7552072342a32e547acd0c1';
const X3hex = '20537df81eef1e45abd85ec45a52f5d3257597f6b6a54b75743caeeac200f258';
const HUGE1hex = '9960238a86a7ecff390b7f37f680e7468fa0c41ee3704fcc68f0be82d19be4b2';
const HUGE2hex = '7866051267741975227839256886788119796968652873699356069992477395';
const HUGEOUThex = '242d78b4397fab47fc6b5d95f73409ff60e113f6fa56992a8da7c363b67e28f3';
const A = hexToBigInt(Ahex);
const B = hexToBigInt(Bhex);
const C = hexToBigInt(Chex);
const X1 = hexToBigInt(X1hex);
const X2 = hexToBigInt(X2hex);
const X3 = hexToBigInt(X3hex);
const HUGE1 = hexToBigInt(HUGE1hex);
const HUGE2 = hexToBigInt(HUGE2hex);
const HUGEOUT = hexToBigInt(HUGEOUThex);

test('hsg88/circomlibjs poseidon 1-arg', async (t) => {
  const x = circomlibjs.poseidon([A]);
  assert.equal(x, X1, 'is correct');
});

test('hsg88/circomlibjs poseidon 2-arg', async (t) => {
  const x = circomlibjs.poseidon([A, B]);
  assert.equal(x, X2, 'is correct');
});

test('hsg88/circomlibjs poseidon 3-arg', async (t) => {
  const x = circomlibjs.poseidon([A, B, C]);
  assert.equal(x, X3, 'is correct');
});

test('hsg88/circomlibjs with huge numbers', async (t) => {
  const x = circomlibjs.poseidon([HUGE1, HUGE2]);
  assert.equal(x, HUGEOUT, 'is correct')
})

test('rs-poseidon should have the correct module shape', async (t) => {
  assert.equal(typeof mod, 'object', 'exports is an object');
  assert.equal(
    typeof mod.default,
    'function',
    'exports.default is a function',
  );
  assert.equal(
    typeof mod.poseidon,
    'function',
    'exports.poseidon is a function',
  );
  assert.equal(
    typeof mod.poseidonHex,
    'function',
    'exports.poseidonHex is a function',
  );
  assert.equal(mod.__esModule, true, 'exports.__esModule is true');
});

test('rs-poseidon poseidon 1-arg', async (t) => {
  const x = mod.poseidon([A]);
  assert.equal(x, X1, 'is correct');
});

test('rs-poseidon poseidon 2-arg', async (t) => {
  const x = mod.poseidon([A, B]);
  assert.equal(x, X2, 'is correct');
});

test('rs-poseidon poseidon 3-arg', async (t) => {
  const x = mod.poseidon([A, B, C]);
  assert.equal(x, X3, 'is correct');
});

test('rs-poseidon with huge numbers', async (t) => {
  const x = mod.poseidon([HUGE1, HUGE2]);
  assert.equal(x, HUGEOUT, 'is correct')
})

test('rs-poseidon Hex poseidon 1-arg', async (t) => {
  const x = mod.poseidonHex([Ahex]);
  assert.equal(x, X1hex, 'is correct');
});

test('rs-poseidon Hex poseidon 2-arg', async (t) => {
  const x = mod.poseidonHex([Ahex, Bhex]);
  assert.equal(x, X2hex, 'is correct');
});

test('rs-poseidon Hex poseidon 3-arg', async (t) => {
  const x = mod.poseidonHex([Ahex, Bhex, Chex]);
  assert.equal(x, X3hex, 'is correct');
});

test('rs-poseidon Hex with huge numbers', async (t) => {
  const x = mod.poseidonHex([HUGE1hex, HUGE2hex]);
  assert.equal(x, HUGEOUThex, 'is correct')
})

test('rs-poseidon poseidon wrong input: not an array', async (t) => {
  assert.throws(() => {
    nativeAddon.poseidon(A, B);
  }, /TypeError: Provided value was not an array as expected/);
});

test('rs-poseidon poseidon wrong input: array of numbers', async (t) => {
  assert.throws(() => {
    nativeAddon.poseidon([1, 2]);
  }, /TypeError: invalid type, expected: string, actual: number/);
});

test('rs-poseidon poseidon wrong input: array of not hex', async (t) => {
  assert.throws(() => {
    nativeAddon.poseidon(['foo', 'bar']);
  }, /TypeError: expected an array of hexadecimal strings/);
});
