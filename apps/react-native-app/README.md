[❮ Overview](../../README.md)

<div align="center">
  <h1>
    React Native App
  </h1>
</div>

[React Native](https://reactnative.dev) mobile app for iOS and Android.

# 🧬 Structure

## Code

- `📁 src`
  - `📄 app.tsx`: The root component for the whole application. It wraps the component tree with context API providers and adds [React Native Navigation](https://reactnavigation.org/docs/getting-started) routes.
  - `📁 screens`: Components that represent a whole application screen.
  - `📁 components`: Components used by screens.
- `📄 index.js`: React native entry point.
- `📄 metro.config.js`: Configures the [Metro JavaScript Bundler](https://facebook.github.io/metro).

## Interactions

- Downloaded, installed and used by the user.
- Accesses the [express-app](../express-app/README.md) at `REACT_NATIVE_API_BASE_URL`.

# 🚀 Development

## Setup

- [iOS React Native Environment](https://reactnative.dev/docs/environment-setup)
  - Install XCode
  - Install CocoaPods:
    ```sh
    brew install cocoapods
    ```
  - Install XCode CLI tools:
    ```sh
    xcode-select --install
    ```
  - Optional: Update XCode CLI tools:
    ```sh
    softwareupdate --list
    softwareupdate -i "Command Line Tools for Xcode-13.4"
    ```
- [Android React Native Environment](https://reactnative.dev/docs/environment-setup)
  - Java Development Kit
    ```sh
    brew tap homebrew/cask-versions
    brew install --cask zulu11
    ```
  - Install [Android Studio](https://developer.android.com/studio)
    - Preferences -> Appearances & Behavior -> System Settings -> Android SDK -> Edit: Install SDK and Android API
    - Virtual Device Manager
      - Create a virtual phone device (download missing system image)
  - Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc (if you are using zsh then ~/.zprofile or ~/.zshrc) config file:
    ```sh
    export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
    export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
    ```
- Monorepo pain points with React Native:
  - `ios/react_native_app.xcodeproj/project.pbxproj` contains relative paths to node_modules and needs to be changed to point to hoisted/root node_modules
  - `metro.config.js`: Root dir needs to be in `watchFolders` to avoid module resolution problems. Otherwise module resolution will mysteriously fail.
  - `android/build.gradle`: Contains relative paths to node_modules
  - `android/settings.gradle`: Contains relative paths to node_modules
  - `android/app/build.gradle`: Set `project.ext.react.cliPath` to `../../../../node_modules/react-native/cli.js`
  - Helpful resource for monorepo setups: [`expo-yarn-workspaces`](https://github.com/expo/expo/tree/main/packages/expo-yarn-workspaces)
