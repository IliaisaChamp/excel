module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'airbnb/base', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  rules: {
    'no-console': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    "no-param-reassign": 'off',
    'linebreak-style': ['error', process.env.NODE_ENV === 'production' ? 'unix' : 'windows'],
  },
};
