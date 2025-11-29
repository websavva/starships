const { dirname, join } = require("path");

const jitiPath = join(
  dirname(require.resolve("jiti/package.json")),
  "lib/jiti.cjs"
);

const createJiti = require(jitiPath);

module.exports = createJiti(__filename)("./index.ts");
