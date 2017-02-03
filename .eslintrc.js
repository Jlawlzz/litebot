module.exports = {
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    test: true
  },
  rules: {
    'no-console': 0,
    'no-empty': 0, // eslint:recommended
    'valid-jsdoc': [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {returns: 'return'},
    }],
    'no-caller': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-invalid-this': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-new-wrappers': 2,
    'no-throw-literal': 2, // eslint:recommended
    'no-with': 2,
    'no-unused-vars': [2, {args: 'none'}], // eslint:recommended
    'array-bracket-spacing': [2, 'never'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'camelcase': [2, {properties: 'never'}],
    'comma-dangle': [2, 'never'],
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'eol-last': 2,
    'key-spacing': 2,
    'keyword-spacing': 0,
    'linebreak-style': 2,
    'new-cap': 2,
    'no-array-constructor': 2,
    'no-mixed-spaces-and-tabs': 2, // eslint:recommended
    'no-multiple-empty-lines': [2, {max: 2}],
    'no-new-object': 2,
    'no-trailing-spaces': 2,
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, {
      var: 'never',
      let: 'never',
      const: 'never',
    }],
    'padded-blocks': [2, 'never'],
    'quote-props': [2, 'consistent'],
    'quotes': [2, 'double', {allowTemplateLiterals: true}],
    'require-jsdoc': 0,
    'semi-spacing': 2,
    'semi': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': [2, 'never'],
    'spaced-comment': [2, 'always'],
    'constructor-super': 2, // eslint:recommended
    'generator-star-spacing': [2, 'after'],
    'no-new-symbol': 2, // eslint:recommended
    'no-this-before-super': 2,  // eslint:recommended
    'no-var': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'rest-spread-spacing': 2,
    'yield-star-spacing': [2, 'after'],
  },
};
