module.exports = {
  root: true,
  extends: ['plugin:vue/base', 'google'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
