module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'airbnb'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    'linebreak-style': ['error', process.env.NODE_ENV === 'production' ? 'unix' : 'windows'],
  },
};
