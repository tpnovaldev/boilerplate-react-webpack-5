module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    semi: 0,
    'linebreak-style': ['error', 'windows'],
    'react/jsx-indent': ['error', 2],
    'max-len': [2, 120, 2],
    'no-console': 'warn',
    'react/prop-types': [2, { ignore: ['history'] }],
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-set-state': 'off',
    'prettier/prettier': 0,
    'react/jsx-props-no-spreading': 'off',
    'prefer-promise-reject-errors': 'off',
    camelcase: 'off',
  },
};
