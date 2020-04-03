module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
