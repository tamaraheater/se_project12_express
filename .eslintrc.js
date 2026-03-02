module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  extends: ["eslint:recommended", "airbnb-base", "prettier"],

  overrides: [
    {
      files: [".eslintrc.{js,cjs}"],
      env: { node: true },
      parserOptions: { sourceType: "script" },
    },
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    "no-console": ["warn", { allow: ["error"] }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
