// nextjs.org/docs/api-reference/next.config.js/introduction

const path = require("path");

// Decode env var from base64
const newRelicCodeSnippet = Buffer.from(
  process.env.NEW_RELIC_CODE_SNIPPET_BASE64,
  "base64"
).toString();

module.exports = {
  poweredByHeader: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Include certain packages into build process (inspired by next-transpile-modules)
    config.module.rules.push({
      test: /\.+(js|jsx|ts|tsx)$/,
      use: defaultLoaders.babel,
      include: [path.resolve(__dirname, "../../libs")],
      type: "javascript/auto",
    });
    return config;
  },
  env: {
    NEW_RELIC_CODE_SNIPPET: newRelicCodeSnippet,
  },
};
