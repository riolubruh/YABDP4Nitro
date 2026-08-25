import js from "@eslint/js";

export default [
  {
    ignores: ["ffmpeg/**", "build/**", "YABDP4Nitro.plugin.js"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      eqeqeq: ["error", "smart"],
      "prefer-const": "warn",
      "no-var": "error",
      "arrow-body-style": ["warn", "as-needed"],
    },
  },
];
