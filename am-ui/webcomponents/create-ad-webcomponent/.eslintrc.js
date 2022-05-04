module.exports = {
  root: true,
  extends: ['plugin:vue/base', 'google', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
