module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      // '@vue/standard',
      "plugin:prettier/recommended",
      "prettier/standard",

    ],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    parserOptions: {
      parser: 'babel-eslint'
    },
    globals:{
      BASE_PUBLIC_PATH:true,
      BASE_ENV:true,
    }
  };
