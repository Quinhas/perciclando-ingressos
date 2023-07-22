module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'next/core-web-vitals'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'indent': ['error', 2, { ignoreComments: true }],
    'linebreak-style': ['error', 'unix'],
    'quote-props': ['error', 'consistent'],
    'quotes': [
      'error',
      'single',
      { allowTemplateLiterals: true, avoidEscape: true },
    ],
    'semi': ['error', 'always'],
  },
};
