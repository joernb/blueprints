# React Native

## Android

### Jetifier

[Jetifier Description:](https://github.com/mikehardy/jetifier#do-you-need-this)

> The standard AndroidX migration rewrites your current installed source code, and at build time dynamically re-writes any linked jar/aar/zip files. This is all a "normal" Android app needs.

> React Native apps are not standard Android apps. React Native modules with native Java code usually distribute that code as source, and link the source code directly.

> When you update your modules (or install them again after following the standard AndroidX migration), the freshly installed Java code from your react-native dependencies will not be translated to AndroidX anymore, and your build will fail.

> So you have to perform an AndroidX migration on your linked source every time you update react native modules that ship native Java code. That is what this tool does - it can rewrite the source in node_modules every time you call it.

### APK Build

```sh
cd android
./gradlew assembleRelease
cd ..
```

### APK Codesigning

### AAB Build

```sh
cd android
./gradlew bundleRelease
cd ..
```

## iOS

## Resources

- [React Native Setup](https://reactnative.dev/docs/environment-setup)
