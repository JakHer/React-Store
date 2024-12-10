module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Ensure this points to the correct tsconfig file
    project: ['./tsconfig.json', './tsconfig.vite.json'],
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'import'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
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
  ignorePatterns: ['vite.config.ts', '**/.husky/_/run/_/post-rewrite'],
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
