import js from "@eslint/js";
import globals from "globals";
import parser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTs from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/next.config.js",
      "**/postcss.config.js",
      "**/tailwind.config.js",
      "**/eslint.config.js",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      js,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginTs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      // TS handles undefined vars; prevent false positives on TS types like React.ReactNode
      "no-undef": "off",
      // Allow styled-jsx usage
      "react/no-unknown-property": ["error", { ignore: ["jsx"] }],
    },
  },
];


