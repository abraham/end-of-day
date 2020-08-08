module.exports = {
  projects: [
    {
      displayName: 'Tests',
      preset: 'ts-jest',
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      transform: {
        '^.+\\.[t|j]sx?$': 'ts-jest',
      },
    },
    {
      displayName: 'ESLint',
      runner: 'eslint',
      testMatch: ['<rootDir>/**/*.ts'],
    },
    {
      displayName: 'Prettier',
      preset: 'jest-runner-prettier',
      testPathIgnorePatterns: ['/node_modules/', '/out-tsc/', '/dist/', '/package-lock.json/', '^.+\\.js$'],
    },
    {
      displayName: 'TypeScript',
      runner: 'tsc',
      testPathIgnorePatterns: ['^.+\\.js$'],
    },
  ],
};
