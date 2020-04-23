#!/bin/bash

$ANDROID_HOME/build-tools/$ANDROID_BUILD_TOOLS/apksigner \
  sign \
  --ks $ANDROID_KEYSTORE_FILE \
  --ks-pass env:ANDROID_KEYSTORE_PASSWORD \
  --ks-key-alias $ANDROID_KEYSTORE_KEY_ALIAS \
  --key-pass env:ANDROID_KEYSTORE_KEY_PASSWORD \
  $ANDROID_APK_FILE
