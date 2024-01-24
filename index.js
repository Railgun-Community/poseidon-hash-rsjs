// Workaround to fix webpack's build warnings:
// 'the request of a dependency is an expression'
const runtimeRequire =
  typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;

const rsjs = runtimeRequire(__dirname + '/index.node');

const SCALAR_FIELD =
  21888242871839275222246405745257275088548364400416034343698204186575808495617n;

module.exports = {
  poseidon(inputs) {
    const hexInputs = inputs.map((input) => {
      if (input > SCALAR_FIELD) {
        return (input % SCALAR_FIELD).toString(16);
      } else {
        return input.toString(16);
      }
    });
    const hexOutput = rsjs.poseidon(hexInputs);
    return BigInt('0x' + hexOutput);
  },
  poseidonHex: rsjs.poseidon,
  default() {
    return Promise.resolve();
  },
  __esModule: true,
};
