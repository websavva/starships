# @starships/eslint-config

Shared ESLint configuration for the Starships project with React JSX and Prettier support. Uses ESLint 9 flat config format.

## Installation

```bash
pnpm add -D @starships/eslint-config eslint prettier typescript
```

## Usage

Create an `eslint.config.js` file in your package (ESLint 9 flat config):

```javascript
import config from "@starships/eslint-config";

export default [
  ...config,
  // Add your package-specific rules here
  {
    rules: {
      // Custom rules
    },
  },
];
```

Or use individual configs:

```javascript
import base from "@starships/eslint-config/base.js";
import react from "@starships/eslint-config/react.js";
import prettier from "@starships/eslint-config/prettier.js";

export default [...base, ...react, prettier];
```

**Note:** Make sure your `package.json` has `"type": "module"` or use `eslint.config.mjs` extension for ES modules support.

## Prettier Configuration

Create a `.prettierrc.js` file:

```javascript
module.exports = require("@starships/eslint-config/.prettierrc.js");
```

Or extend the default config:

```javascript
module.exports = {
  ...require("@starships/eslint-config/.prettierrc"),
  // Add your custom prettier options
};
```

## Features

- ✅ TypeScript support
- ✅ React and JSX support
- ✅ React Hooks rules
- ✅ Prettier integration (disables conflicting ESLint rules)
- ✅ Modern ES2021+ syntax

