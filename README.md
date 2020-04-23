#

<!-- TODO Set project name as heading -->

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

## Getting started

Install dependencies:

```sh
yarn
```

Set up environment variables in `.env`:

```sh
cp .env.example .env
```

Start the packager for debugging and run an Android emulator or an iOS simulator:

```sh
yarn start
yarn android
yarn ios
```

Run tests:

```sh
yarn test
```

## Android Build

Build an APK:

```sh
yarn build:android
```

## iOS Build

Find a way to install CocoaPods:

```sh
sudo gem install cocoapods
brew install cocoapods
```

Install pod:

```sh
cd ios
pod install
cd ..
```

Build the project:

```sh
yarn build:ios
```

## Documentation

See the [docs](./docs) folder for more information.

## Acknowledgments
