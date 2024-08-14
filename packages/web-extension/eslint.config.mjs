import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // mimic ESLintRC-style extends
  ...compat.extends('carbon'),
  {
    files: ['src/**/*.js'],
    ignores: ['node_modules', '*.log', 'dist'],
    languageOptions: {
      globals: {
        chrome: 'readonly',
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
      "react/forbid-component-props": "warn",
      "react/forbid-dom-props": "warn",
   }
  },
];
