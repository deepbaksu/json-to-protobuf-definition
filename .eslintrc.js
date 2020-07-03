module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  ignorePatterns: ['**/*_pb.*'],
  extends: [
    'eslint:recommended',
    'plugin:jest/all',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'jest/no-disabled-tests': 'warn',
  },
}
