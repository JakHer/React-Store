import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

const compat = new FlatCompat();

export default [
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.vite.json'],
        tsconfigRootDir: './',
      },
    },
    ignores: ['node_modules', 'dist', 'build', 'public'],
    plugins: {
      'react': reactPlugin,
      'prettier': prettierPlugin,
      '@typescript-eslint': tsPlugin,
      'import': importPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { bracketSpacing: true }],
      'object-curly-spacing': 'off',
      'space-in-parens': 'off',
      'space-before-blocks': 'off',
      'react/jsx-curly-spacing': 'off',
      'react/jsx-equals-spacing': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      'react/prop-types': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',

      'import/extensions': [
        'error',
        'never',
        {
          'svg': 'always',
          'json': 'always',
          'ts': 'never',
          'tsx': 'never',
          'd.ts': 'never',
          'types': 'never',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.tsx',
            '**/*.spec.tsx',
            '**/*.test.ts',
            '**/*.spec.ts',
          ],
        },
      ],

      // React version setting
      'react/jsx-uses-react': 'off',
    },
    settings: {
      'react': {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ['vite.config.ts', '**/*.d.ts'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
