import { defineConfig } from "eslint/config";

import base from "./base.js";
import prettier from "./prettier.js";

export default defineConfig([base, prettier]);
