// Collect all environment variables starting with "REACT_NATIVE_"
const env = Object.entries(process.env)
  .filter(([key, value]) => key.startsWith("REACT_NATIVE_"))
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "transform-define",
      {
        "process.env": env,
      },
    ],
  ],
};
