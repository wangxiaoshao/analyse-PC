module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': [
      0,
      'error',
      'windows'
    ],
    'no-param-reassign': 0,
    'no-shadow': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'max-len': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'no-unused-expressions': 0,
    'vue/attributes-order': 0,
    'vue/mustache-interpolation-spacing': 0,
    'eslint-disable-next-line': 1,
    'no-multiple-empty-lines': [
      1,
      {
        max: 2
      }
    ],
    'eslint-disable-next-line': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals:{
    BASE_PUBLIC_PATH:true,
    BASE_ENV:true,
  }
};
