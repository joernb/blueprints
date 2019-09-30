const fs = require("fs");

// Woraround for importing react-intl v3
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  });
};

// Flatten { "foo": { "bar": "baz" } } to { "foo.bar": "baz" }
const flattenMessages = (nested, prefix = "") => {
  return Object.keys(nested).reduce((messages, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    const value = nested[key];
    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});
};

// Create every page for every locale
exports.onCreatePage = ({ page, actions }, { messagesDir }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  const locales = fs.readdirSync(messagesDir).map(
    filename =>
      filename
        .split(".")
        .slice(0, -1)
        .join(".") // e.g. map "de.json" to "de"
  );

  locales.forEach(locale => {
    const messages = flattenMessages(require(`${messagesDir}/${locale}.json`));
    // use special path message
    const path = messages.path.replace("{originalPath}", page.path);
    // adjust matchPath for localized 404 pages
    const matchPath = page.path.includes(`/404/`)
      ? messages.path.replace("{originalPath}", "/*")
      : page.matchPath;

    createPage({
      ...page,
      path,
      matchPath,
      context: {
        ...page.context,
        locale,
        messages,
        originalPath: page.path,
      },
    });
  });
};
