# Node.js addon for Poseidon hash written in Rust

Uses the Rust `rs-poseidon` crate to implement a performant Poseidon hash
function, available as a Node.js native addon.

## Installing poseidon-hash-rsjs

Installing poseidon-hash-rsjs requires a supported version of Node and Rust such as Node.js 18 or higher and Rust 1.64 or higher.

You can install the project with npm. In the project directory, run:

```sh
$ npm install
```

This fully installs the project, including installing any dependencies and running the build.

## Compiling poseidon-hash-rsjs

This project is automatically compiled using Rust and [`node-bindgen`](https://github.com/infinyon/node-bindgen/) (a.k.a `nj-cli`) when you run `npm install`. If you have cloned this project and want to compile it manually, you can run `npm run build-debug` or `npm run build-release`.

**If you want to disable** the automatic compilation during npm install, then set the environment variable `DONT_COMPILE_NODE_ADDON=@railgun-community/poseidon-hash-rsjs` (this can be a comma-separated list of packages to skip compiling).

## Developing poseidon-hash-rsjs

In the project directory, you can run:

### `npm install`

Installs the project, including running `npm run build-release`.

#### `npm build-debug`

#### `npm build-release`

Same as `npm run build-debug` but, builds the module with the [`release`](https://doc.rust-lang.org/cargo/reference/profiles.html#release) profile. Release builds will compile slower, but run faster.

### `npm test`

Runs the unit tests.

## Making prebuilds

### For Android

Make sure you have the cross-compilation targets supported:

```
rustup target add arm-linux-android
```

```
rustup target add aarch64-linux-android
```

```
rustup target add x86_64-linux-android
```

Use Android NDK version 24 or higher by ensuring you have the env var `ANDROID_NDK_HOME` pointed at the NDK 24 directory. If you get a compilation error about `-lgcc`, you might have to apply [this hack deep in your NDK](https://stackoverflow.com/a/74041320/315752).

```
npx prebuild-for-nodejs-mobile android-arm --sdk33 --verbose
```

```
npx prebuild-for-nodejs-mobile android-arm64 --sdk33 --verbose
```

```
npx prebuild-for-nodejs-mobile android-x64 --sdk33 --verbose
```

### For iOS


Make sure you have the cross-compilation targets supported:

```
rustup target add x86_64-apple-ios
```

```
rustup target add aarch64-apple-ios
```

Then compile the prebuilds:

```
npx prebuild-for-nodejs-mobile ios-arm64 --verbose
```

```
npx prebuild-for-nodejs-mobile ios-arm64-simulator --verbose
```

```
npx prebuild-for-nodejs-mobile ios-x64-simulator --verbose
```
