// @ts-check
import eslint from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    name: 'eslintignore',
    ignores: ['eslint.config.js', '**/*.d.ts'],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  {
    name: 'eslint recommended',
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [eslint.configs.recommended, eslintPluginImportX.flatConfigs.recommended],
    rules: {
      curly: 'error',
      'no-case-declarations': 'warn',
      'no-console': 'warn',
      'no-constant-binary-expression': 'error',
      'no-nested-ternary': 'warn',
      'no-prototype-builtins': 'warn',
      'no-underscore-dangle': 'warn',
      'no-useless-constructor': 'warn',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: true,
        },
      ],

      'import-x/no-anonymous-default-export': 'off',
      'import-x/no-cycle': 'error',
      'import-x/no-extraneous-dependencies': 'error',
      'import-x/no-named-as-default': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index']],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'internal',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  {
    name: 'typescript specific',
    files: ['**/*.{ts,tsx}'],
    extends: [eslintPluginImportX.flatConfigs.typescript, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
        },
      ],
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
);
