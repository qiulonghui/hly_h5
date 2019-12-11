module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
		'no-console':'off'
	},
  parserOptions: {
    parser: 'babel-eslint'
  }
}
