module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/namespace': [2, { allowComputed: false }],
  },
};
